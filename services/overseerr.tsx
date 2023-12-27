import {
	Movie,
	MediaType,
	MediaStatus,
	Series,
	Season,
	Download,
	Collection,
	File,
	Audio,
	Subtitle,
} from '@/app/types';
import tautulli from '@/services/tautulli';
import 'server-only';

async function endpoint(endpoint: string) {
	const response = await fetch(process.env.OVERSEERR_URL + endpoint, {
		headers: {
			'x-api-key': process.env.OVERSEERR_API_KEY,
		} as HeadersInit,
		cache: 'no-cache',
	});

	if (response.status !== 200) {
		const errorData = await response.json();
		if (errorData.error) {
			throw new Error('Overseerr API: ' + errorData.error);
		} else if (errorData.message) {
			throw new Error('Overseerr API: ' + errorData.message);
		} else {
			throw new Error('Overseerr API: Unknown error');
		}
	}

	return await response.json();
}

const overseerr = {
	getMedia: async (mediaType: MediaType, id: number) => {
		if (mediaType === MediaType.MOVIE) {
			return await overseerr.getMovie(id);
		} else if (mediaType === MediaType.TV) {
			return await overseerr.getSeries(id);
		} else if (mediaType === MediaType.COLLECTION) {
			return await overseerr.getCollection(id);
		} else {
			return null;
		}
	},
	getMovie: async (id: number) => {
		const movieDetails = await endpoint('/movie/' + id);

		const movie: Movie = {
			id: movieDetails.id,
			title: movieDetails.title,
			overview: movieDetails.overview,
			releaseDate: movieDetails.releaseDate,
			posterPath: movieDetails.posterPath,
			backdropPath: movieDetails.backdropPath,
			relatedVideos: movieDetails.relatedVideos,
			runtime: movieDetails.runtime,
			budget: movieDetails.budget,
			revenue: movieDetails.revenue,
			rating: movieDetails.rating,
			mediaType: MediaType.MOVIE,
			collection: null,
			genre: movieDetails.genres[0]?.name || null,
			cast: movieDetails.credits.cast,
			productionCompany: movieDetails.productionCompanies[0]?.name || null,
			contentRating:
				movieDetails.releases.results
					.find((release: any) => release.iso_3166_1 === 'US')
					?.release_dates.find((date: any) => date.certification !== '')?.certification || 'NR',
			requestStatus: movieDetails.mediaInfo?.status || MediaStatus.UNKNOWN,
			ratingKey: parseInt(movieDetails.mediaInfo?.ratingKey) || null,
			plexUrl: movieDetails.mediaInfo?.plexUrl || null,
			iOSPlexUrl: movieDetails.mediaInfo?.iOSPlexUrl || null,
			file: null,
		};

		if (movieDetails.collection) {
			movie.collection = {
				id: movieDetails.collection.id,
				name: movieDetails.collection.name,
				overview: movieDetails.collection.overview,
				posterPath: movieDetails.collection.posterPath,
				backdropPath: movieDetails.collection.backdropPath,
				movies: movieDetails.collection.parts,
				mediaType: MediaType.COLLECTION,
			};
		}

		if (movie.requestStatus === MediaStatus.AVAILABLE && movie.ratingKey) {
			movie.file = await tautulli.getFile(movie.ratingKey);
		}

		return movie;
	},
	getCollection: async (id: number) => {
		const collectionDetails = await endpoint('/collection/' + id);

		const collection: Collection = {
			id: collectionDetails.id,
			name: collectionDetails.name,
			overview: collectionDetails.overview,
			posterPath: collectionDetails.posterPath,
			backdropPath: collectionDetails.backdropPath,
			movies: collectionDetails.parts,
			mediaType: MediaType.COLLECTION,
		};

		return collection;
	},
	getSeries: async (id: number) => {
		const tvDetails = await endpoint('/tv/' + id);

		const series: Series = {
			mediaType: MediaType.TV,
			id: tvDetails.id,
			backdropPath: tvDetails.backdropPath,
			posterPath: tvDetails.posterPath,
			genre: tvDetails.genres[0]?.name || null,
			overview: tvDetails.overview,
			firstAirDate: tvDetails.firstAirDate,
			lastAirDate: tvDetails.lastAirDate || null,
			name: tvDetails.name,
			episodeRunTime: tvDetails.episodeRunTime[0],
			numberOfSeasons: tvDetails.numberOfSeasons,
			numberOfEpisodes: tvDetails.numberOfEpisodes,
			cast: tvDetails.credits.cast,
			requestStatus: tvDetails.mediaInfo?.status || MediaStatus.UNKNOWN,
			seasons: tvDetails.seasons,
			network: tvDetails.networks[0]?.name || null,
			status: tvDetails.status,
			contentRating:
				tvDetails.contentRatings.results.find(
					(contentRating: any) => contentRating.iso_3166_1 === 'US',
				).rating || 'NR',

			downloads:
				tvDetails.mediaInfo?.downloadStatus.map((download: Download) => ({
					id: download.id,
					estimatedCompletionTime: download.estimatedCompletionTime,
					status: download.status,
					size: download.size,
					sizeLeft: download.sizeLeft,
					episode: download.episode,
				})) || null,

			ratingKey: tvDetails.mediaInfo?.ratingKey || null,
			plexUrl: tvDetails.mediaInfo?.plexUrl || null,
			iOSPlexUrl: tvDetails.mediaInfo?.iOSPlexUrl || null,
		};

		return series;
	},
	getSeason: async (id: number, seasonNumber: number) => {
		const seasonDetails = await endpoint('/tv/' + id + '/season/' + seasonNumber);

		if (seasonDetails.episodes === undefined) {
			return;
		}

		const season: Season = {
			id: seasonDetails.id,
			airDate: seasonDetails.airDate,
			episodeCount: seasonDetails.episodeCount,
			name: seasonDetails.name,
			overview: seasonDetails.overview,
			posterPath: seasonDetails.posterPath,
			seasonNumber: seasonDetails.seasonNumber,
			episodes: seasonDetails.episodes.map((episode: any) => ({
				id: episode.id,
				title: episode.name,
				airDate: episode.airDate,
				episodeNumber: episode.episodeNumber,
				overview: episode.overview,
				seasonNumber: episode.seasonNumber,
				stillPath: episode.stillPath,
			})),
			requestStatus: seasonDetails.status,
		};

		return season;
	},
	getRecommended: async (mediaType: MediaType, id: number) => {
		const recommended = await endpoint('/' + mediaType + '/' + id + '/recommendations');

		return recommended.results;
	},
	getSimilar: async (mediaType: MediaType, id: number) => {
		const similar = await endpoint('/' + mediaType + '/' + id + '/similar');

		return similar.results;
	},
	getRatings: async (mediaType: MediaType, id: number) => {
		const ratings = await endpoint('/' + mediaType + '/' + id + '/ratings');

		return ratings;
	},
	search: async (query: string, page: number = 1, language: string = 'en') => {
		const search = await endpoint(
			'/search?query=' + query + '&page=' + page + '&language=' + language,
		);

		return search.results;
	},
};

export default overseerr;
