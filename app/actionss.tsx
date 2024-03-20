'use server';

import {
	MediaType,
	Movie,
	Series,
	File,
	MediaMetadata,
	Ratings,
	RottenTomatoes,
	SeriesMetadata,
	Season,
	ArrServer,
	ArrProfile,
	Collection,
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
			trailerUrl: overseerrResponse.relatedVideos.find((video) => video.type === 'Trailer')?.url,
			originalLanguage: overseerrResponse.originalLanguage,
			cast: overseerrResponse.credits.cast,
			collection: overseerrResponse.collection,
			certification: Array.isArray(overseerrResponse.releases.results)
				? overseerrResponse.releases.results
						.find((release) => release.iso_3166_1 === 'US')
						?.release_dates.find((date) => date.type === 3 && date.certification)?.certification ??
					overseerrResponse.releases.results
						.find((release) => release.iso_3166_1 === 'US')
						?.release_dates.find((date) => date.certification)?.certification ??
					''
				: '',
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
			requestStatus: overseerrResponse.mediaInfo.status,
			ratingKey: overseerrResponse.mediaInfo.ratingKey,
			plexUrl: overseerrResponse.mediaInfo.plexUrl,
			iOSPlexUrl: overseerrResponse.mediaInfo.iOSPlexUrl,
			serviceUrl: overseerrResponse.mediaInfo.serviceUrl,
		};

		// movie is also available in plex
		if (overseerrResponse.mediaInfo.status === 5) {
			const files = await getFiles(overseerrResponse.mediaInfo.ratingKey);

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

	const medias: MediaMetadata[] = res.results.map((media: any) => {
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

	const medias: MediaMetadata[] = res.results.map((media: any) => {
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
			trailerUrl: overseerrResponse.relatedVideos.find((video: any) => video.type === 'Trailer')
				?.url,
			numberOfSeasons: overseerrResponse.numberOfSeasons,
			numberOfEpisodes: overseerrResponse.numberOfEpisodes,
			firstAirDate: overseerrResponse.firstAirDate,
			lastAirDate: overseerrResponse.lastAirDate,
			networks: overseerrResponse.networks,
			status: overseerrResponse.status,
			type: overseerrResponse.type,
			cast: overseerrResponse.credits.cast,
			certification:
				overseerrResponse.contentRatings.results.find((rating: any) => rating.iso_3166_1 === 'US')
					?.rating ?? '',
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
			requestStatus: overseerrResponse.mediaInfo.status,
			ratingKey: overseerrResponse.mediaInfo.ratingKey,
			plexUrl: overseerrResponse.mediaInfo.plexUrl,
			iOSPlexUrl: overseerrResponse.mediaInfo.iOSPlexUrl,
			serviceUrl: overseerrResponse.mediaInfo.serviceUrl,
		};
	}

	return series;
}

export async function getRecommendedSeries(id: number) {
	const res = await overseerr.endpoint('/tv/' + id + '/similar');

	const medias: MediaMetadata[] = res.results.map((media: any) => {
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

	const medias: MediaMetadata[] = res.results.map((media: any) => {
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

export async function getCollection(id: number) {
	const overseerResponse = await overseerr.endpoint('/collection/' + id);

	const collection: Collection = {
		id: overseerResponse.id,
		mediaType: MediaType.COLLECTION,
		name: overseerResponse.name,
		overview: overseerResponse.overview,
		posterPath: overseerResponse.posterPath,
		backdropPath: overseerResponse.backdropPath,
		parts: overseerResponse.parts.map((part: any) => {
			return {
				id: part.id,
				mediaType: part.mediaType,
				title: part.title,
				releaseDate: part.releaseDate,
				overview: part.overview,
				posterPath: part.posterPath,
				backdropPath: part.backdropPath,
			};
		}),
	};

	return collection;
}

export async function getArrServers() {
	const overseerrResponse = await overseerr.endpoint('/service/radarr');

	const arrServers: ArrServer[] = overseerrResponse.map((arrServer: any) => {
		return {
			id: arrServer.id,
			name: arrServer.name,
			isDefault: arrServer.isDefault,
			activeProfileId: arrServer.activeProfileId,
		};
	});

	return arrServers;
}

export async function getArrProfiles(id: number) {
	const overseerrResponse = await overseerr.endpoint('/service/radarr/' + id);

	const arrProfiles: ArrProfile[] = overseerrResponse.profiles.map((arrProfile: any) => {
		return {
			id: arrProfile.id,
			name: arrProfile.name,
		};
	});

	return arrProfiles;
}

export async function getUsers() {
	//TODO: Get more than 10 users
	const overseerrResponse = await overseerr.endpoint('/user');

	const defaultUserReponse = await overseerr.endpoint('/auth/me');

	const users = overseerrResponse.results.map((user: any) => {
		return {
			id: user.id,
			username: user.plexUsername ? user.plexUsername : user.username,
			email: user.email,
			avatar: user.avatar,
			isDefault: user.id === defaultUserReponse.id,
		};
	});

	return users;
}

export async function postRequest(
	mediaType: MediaType,
	id: number,
	serverId: number,
	profileId: number,
	userId: number,
) {
	console.log(mediaType, id, serverId, profileId, userId);

	return 'success';
}

export async function getActiveSessions() {
	const sessions = await tautulli.getSessions();

	return sessions;
}

export async function getFiles(ratingKey: number) {
	const files = await tautulli.getFiles(ratingKey);

	return files;
}
