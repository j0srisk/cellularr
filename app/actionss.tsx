'use server';

import {
	MediaType,
	Movie,
	Series,
	File,
	RelatedMediaMetadata,
	Ratings,
	RottenTomatoes,
	SeriesMetadata,
	Season,
	Radarr,
} from '@/app/typess';
import { MovieDetails } from '@/services/overseerr/interface';
import overseerr from '@/services/overseerr/overseerr';
import tautulli from '@/services/tautulli/tautulli';

export async function getSearchResults(query: string, page?: number, language?: string) {
	if (!page) page = 1;
	if (!language) language = 'en';
	const searchResults = await overseerr.endpoint(
		'/search' + '?query=' + query + '&page=' + page + '&language=' + language,
	);

	return searchResults;
}

export async function getMovie(id: number) {
	const overseerrResponse: MovieDetails = await overseerr.endpoint('/movie/' + id);

	const movie: Movie = {
		mediaType: MediaType.MOVIE,
		metadata: {
			mediaType: MediaType.MOVIE,
			id: overseerrResponse.id,
			backdropPath: overseerrResponse.backdropPath,
			posterPath: overseerrResponse.posterPath,
			budget: overseerrResponse.budget,
			overview: overseerrResponse.overview,
			releaseDate: overseerrResponse.releaseDate,
			revenue: overseerrResponse.revenue,
			runtime: overseerrResponse.runtime,
			status: overseerrResponse.status,
			tagline: overseerrResponse.tagline,
			title: overseerrResponse.title,
			cast: overseerrResponse.credits.cast,
			releases: overseerrResponse.releases.results,
		},
		ratings: await getMovieRatings(id),
		recommendations: await getRecommendedMovies(id),
		similar: await getSimilarMovies(id),
	};

	// movie exists in overseerr
	if (overseerrResponse.mediaInfo) {
		movie.info = {
			mediaType: MediaType.MOVIE,
			id: overseerrResponse.mediaInfo.id,
			tmdbId: overseerrResponse.mediaInfo.tmdbId,
			status: overseerrResponse.mediaInfo.status,
			ratingKey: overseerrResponse.mediaInfo.ratingKey,
			plexUrl: overseerrResponse.mediaInfo.plexUrl,
			iOSPlexUrl: overseerrResponse.mediaInfo.iOSPlexUrl,
			serviceUrl: overseerrResponse.mediaInfo.serviceUrl,
		};

		// movie is available in plex
		if (overseerrResponse.mediaInfo.status === 5) {
			const files = await getFiles(overseerrResponse.mediaInfo.ratingKey);

			console.log(files[0].parts[0].streams);

			const movieFiles: File[] = files.map((file) => {
				return {
					id: file.id,
					resolution: file.video_resolution,
					fullResolution: file.video_full_resolution,
					size: file.parts[0].file_size,
					subtitles: file.parts[0].streams
						.filter((stream) => stream.type == 3)
						.map((stream) => ({
							id: stream.id,
							language: stream.subtitle_language,
							languageCode: stream.subtitle_language_code,
						})),
				};
			});

			movie.files = movieFiles;
		}
	}

	return movie;
}

export async function getMovieRatings(id: number) {
	const res = await overseerr.endpoint('/movie/' + id + '/ratings');

	const ratings: Ratings = {};

	if (!res) {
		return ratings;
	}

	const rottenTomatoes: RottenTomatoes = {
		url: res.url,
		criticsScore: res.criticsScore,
		criticsRating: res.criticsRating,
	};

	ratings.rottenTomatoes = rottenTomatoes;

	return ratings;
}

export async function getRecommendedMovies(id: number) {
	const res = await overseerr.endpoint('/movie/' + id + '/recommendations');

	const medias: RelatedMediaMetadata[] = res.results.map((media: any) => {
		return {
			mediaType: MediaType.MOVIE,
			id: media.id,
			title: media.title,
			overview: media.overview,
			releaseDate: media.releaseDate,
			posterPath: media.posterPath,
			backdropPath: media.backdropPath,
		};
	});

	return medias;
}

export async function getSimilarMovies(id: number) {
	const res = await overseerr.endpoint('/movie/' + id + '/similar');

	const medias: RelatedMediaMetadata[] = res.results.map((media: any) => {
		return {
			mediaType: MediaType.MOVIE,
			id: media.id,
			title: media.title,
			overview: media.overview,
			releaseDate: media.releaseDate,
			posterPath: media.posterPath,
			backdropPath: media.backdropPath,
		};
	});

	return medias;
}

export async function getSeries(id: number) {
	const overseerrResponse = await overseerr.endpoint('/tv/' + id);

	const series: Series = {
		mediaType: MediaType.TV,
		metadata: {
			mediaType: MediaType.TV,
			id: overseerrResponse.id,
			name: overseerrResponse.name,
			backdropPath: overseerrResponse.backdropPath,
			posterPath: overseerrResponse.posterPath,
			overview: overseerrResponse.overview,
			tagline: overseerrResponse.tagline,
			numberOfSeasons: overseerrResponse.numberOfSeasons,
			numberOfEpisodes: overseerrResponse.numberOfEpisodes,
			firstAirDate: overseerrResponse.firstAirDate,
			lastAirDate: overseerrResponse.lastAirDate,
			networks: overseerrResponse.networks,
			status: overseerrResponse.status,
			type: overseerrResponse.type,
			cast: overseerrResponse.credits.cast,
			contentRatings: overseerrResponse.contentRatings,
		},
		seasons: overseerrResponse.seasons.map((season: any) => {
			return {
				id: season.id,
				seasonNumber: season.seasonNumber,
				name: season.name,
				overview: season.overview,
				posterPath: season.posterPath,
				episodeCount: season.episodeCount,
			};
		}),
		ratings: await getSeriesRatings(id),
		recommendations: await getRecommendedSeries(id),
		similar: await getSimilarSeries(id),
	};

	if (overseerrResponse.mediaInfo) {
		series.info = {
			mediaType: MediaType.TV,
			id: overseerrResponse.mediaInfo.id,
			tmdbId: overseerrResponse.mediaInfo.tmdbId,
			status: overseerrResponse.mediaInfo.status,
			ratingKey: overseerrResponse.mediaInfo.ratingKey,
			plexUrl: overseerrResponse.mediaInfo.plexUrl,
			iOSPlexUrl: overseerrResponse.mediaInfo.iOSPlexUrl,
			serviceUrl: overseerrResponse.mediaInfo.serviceUrl,
		};
	}

	console.log(series);

	return series;
}

export async function getRecommendedSeries(id: number) {
	const res = await overseerr.endpoint('/tv/' + id + '/similar');

	const medias: RelatedMediaMetadata[] = res.results.map((media: any) => {
		return {
			mediaType: MediaType.TV,
			id: media.id,
			title: media.name,
			overview: media.overview,
			releaseDate: media.firstAirDate,
			posterPath: media.posterPath,
			backdropPath: media.backdropPath,
		};
	});

	return medias;
}

export async function getSimilarSeries(id: number) {
	const res = await overseerr.endpoint('/tv/' + id + '/recommendations');

	const medias: RelatedMediaMetadata[] = res.results.map((media: any) => {
		return {
			mediaType: MediaType.TV,
			id: media.id,
			title: media.name,
			overview: media.overview,
			releaseDate: media.firstAirDate,
			posterPath: media.posterPath,
			backdropPath: media.backdropPath,
		};
	});

	return medias;
}

export async function getSeriesRatings(id: number) {
	const res = await overseerr.endpoint('/tv/' + id + '/ratings');

	const ratings: Ratings = {};

	if (!res) {
		return ratings;
	}

	const rottenTomatoes: RottenTomatoes = {
		url: res.url,
		criticsScore: res.criticsScore,
		criticsRating: res.criticsRating,
	};

	ratings.rottenTomatoes = rottenTomatoes;

	return ratings;
}

export async function getRadarrs() {
	const overseerrResponse = await overseerr.endpoint('/settings/radarr');

	const radarrs: Radarr[] = overseerrResponse.radarr.map((radarr: any) => {
		return {
			id: radarr.id,
			name: radarr.name,
			activeProfileId: radarr.activeProfileId,
			activeProfileName: radarr.activeProfileName,
		};
	});

	console.log(radarrs);

	return radarrs;
}

export async function getFiles(ratingKey: number) {
	const files = await tautulli.getFiles(ratingKey);

	return files;
}
