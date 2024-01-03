import { Movie, MediaType, MediaStatus, Series, Season, Download, Collection } from '@/app/types';
import tautulli from '@/services/tautulli';
import 'server-only';

async function endpoint(endpoint: string, method: string = 'GET', body?: any) {
	const options: RequestInit = {
		headers: {
			'x-api-key': process.env.OVERSEERR_API_KEY,
			'Content-Type': 'application/json',
		} as HeadersInit,
		cache: 'no-cache',
	};

	if (method !== 'GET' && method !== 'HEAD') {
		options.method = method;
		options.body = JSON.stringify(body);
	}

	const response = await fetch(process.env.OVERSEERR_URL + endpoint, options);

	if (response.status !== 200 && response.status !== 201) {
		const errorData = await response.json();
		if (errorData.error) {
			throw new Error('Overseerr API: ' + errorData.error);
		} else if (errorData.message) {
			//ignore errors for missing ratings
			if (
				errorData.message === 'Unable to retrieve movie ratings.' ||
				errorData.message === 'Unable to retrieve series ratings.' ||
				errorData.message === 'Rotten Tomatoes ratings not found.'
			) {
				return null;
			}
			console.error(errorData);
			throw new Error('Overseerr API: ' + errorData.message);
		} else {
			console.error(errorData);
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

		const movie = overseerr.convertMovie(movieDetails);

		if (movieDetails.collection) {
			movie.collection = overseerr.convertCollection(movieDetails.collection);
		}

		const ratings = await overseerr.getRatings(MediaType.MOVIE, id);

		if (ratings) {
			movie.criticsRating = ratings;
		}

		if (movie.requestStatus === MediaStatus.AVAILABLE && movie.ratingKey) {
			movie.file = await tautulli.getFile(movie.ratingKey);
		}

		return movie;
	},
	getCollection: async (id: number) => {
		const collectionDetails = await endpoint('/collection/' + id);

		const collection = overseerr.convertCollection(collectionDetails);

		return collection;
	},
	getSeries: async (id: number) => {
		const tvDetails = await endpoint('/tv/' + id);

		const series = overseerr.convertSeries(tvDetails);

		const ratings = await overseerr.getRatings(MediaType.TV, id);

		if (ratings) {
			series.criticsRating = ratings;
		}

		// looks up requests for series to determine which seasons have been requested
		if (tvDetails.mediaInfo?.requests) {
			tvDetails.mediaInfo.requests.forEach((request: any) => {
				request.seasons.forEach((requestSeason: any) => {
					series.seasons.forEach((seriesSeason: any) => {
						if (requestSeason.seasonNumber === seriesSeason.seasonNumber) {
							if (requestSeason.status === 1) {
								seriesSeason.requestStatus = MediaStatus.PENDING;
							} else if (requestSeason.status === 2) {
								seriesSeason.requestStatus = MediaStatus.PROCESSING;
							}
						}
					});
				});
			});
		}

		// looks up request status for each season and maps to existing season objects if mediaInfo is available
		if (tvDetails.mediaInfo?.seasons) {
			tvDetails.mediaInfo.seasons.forEach((mediaInfoSeason: any) => {
				series.seasons.forEach((season: any) => {
					if (mediaInfoSeason.seasonNumber === season.seasonNumber) {
						// requested seasons will have a status of unkown (1) in mediaInfo for some reason
						if (mediaInfoSeason.status != 1) {
							season.requestStatus = mediaInfoSeason.status;
						}
					}
				});
			});
		}

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
	getRecommendedMovies: async (id: number) => {
		const recommended = await endpoint('/movie/' + id + '/recommendations');

		let movies: Movie[] = [];
		recommended.results.forEach((movieDetails: any) => {
			const movie = overseerr.convertMovie(movieDetails);

			movies.push(movie);
		});

		return movies;
	},
	getRecommendedSeries: async (id: number) => {
		const recommended = await endpoint('/tv/' + id + '/recommendations');

		let serieses: Series[] = [];
		recommended.results.forEach((tvDetails: any) => {
			const series = overseerr.convertSeries(tvDetails);

			serieses.push(series);
		});

		return serieses;
	},
	getSimilarMovies: async (id: number) => {
		const similar = await endpoint('/movie/' + id + '/similar');

		let movies: Movie[] = [];
		similar.results.forEach((movieDetails: any) => {
			const movie = overseerr.convertMovie(movieDetails);

			movies.push(movie);
		});

		return movies;
	},
	getSimilarSeries: async (id: number) => {
		const similar = await endpoint('/tv/' + id + '/similar');

		let serieses: Series[] = [];
		similar.results.forEach((tvDetails: any) => {
			const series = overseerr.convertSeries(tvDetails);

			serieses.push(series);
		});

		return serieses;
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
	request: async (mediaType: MediaType, id: number, seasons?: number[]) => {
		const requestBody = {
			mediaType: mediaType,
			mediaId: id,
			seasons: seasons || null,
		};

		const request = await endpoint('/request', 'POST', requestBody);

		return request;
	},
	//converts movieDetails object from overseerr to movie object
	convertMovie: (movieDetails: any) => {
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
			genre: movieDetails.genres ? movieDetails.genres[0]?.name : null,
			cast: movieDetails.credits ? movieDetails.credits.cast : null,
			productionCompany: movieDetails.productionCompanies
				? movieDetails.productionCompanies[0]?.name
				: null,
			contentRating:
				movieDetails.releases?.results
					?.find((release: any) => release.iso_3166_1 === 'US')
					?.release_dates.find((date: any) => date.certification !== '')?.certification || 'NR',
			requestStatus: movieDetails.mediaInfo?.status || MediaStatus.UNKNOWN,
			ratingKey: parseInt(movieDetails.mediaInfo?.ratingKey) || null,
			plexUrl: movieDetails.mediaInfo?.plexUrl || null,
			iOSPlexUrl: movieDetails.mediaInfo?.iOSPlexUrl || null,
			file: null,
			criticsRating: null,
		};

		return movie;
	},
	//converts collectionDetails object from overseerr to collection object
	convertCollection: (collectionDetails: any) => {
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
	//converts tvDetails object from overseerr to series object
	convertSeries: (tvDetails: any) => {
		const series: Series = {
			mediaType: MediaType.TV,
			id: tvDetails.id,
			backdropPath: tvDetails.backdropPath,
			posterPath: tvDetails.posterPath,
			genre: tvDetails.genres ? tvDetails.genres[0]?.name : null,
			overview: tvDetails.overview,
			firstAirDate: tvDetails.firstAirDate,
			lastAirDate: tvDetails.lastAirDate || null,
			name: tvDetails.name,
			episodeRunTime: tvDetails.episodeRunTime ? tvDetails.episodeRunTime[0] : null,
			numberOfSeasons: tvDetails.numberOfSeasons,
			numberOfEpisodes: tvDetails.numberOfEpisodes,
			cast: tvDetails.credits ? tvDetails.credits.cast : null,
			requestStatus: tvDetails.mediaInfo?.status || MediaStatus.UNKNOWN,
			seasons: tvDetails.seasons?.map((season: any) => ({
				id: season.id,
				airDate: season.airDate,
				episodeCount: season.episodeCount,
				name: season.name,
				overview: season.overview,
				posterPath: season.posterPath,
				seasonNumber: season.seasonNumber,
				requestStatus: MediaStatus.UNKNOWN,
			})),
			network: tvDetails.networks ? tvDetails.networks[0]?.name : null,
			status: tvDetails.status,
			contentRating:
				tvDetails.contentRatings?.results?.find(
					(contentRating: any) => contentRating.iso_3166_1 === 'US',
				)?.rating || 'NR',

			downloads:
				tvDetails.mediaInfo?.downloadStatus.map((download: Download) => ({
					id: download.id,
					estimatedCompletionTime: download.estimatedCompletionTime,
					status: download.status,
					size: download.size,
					sizeLeft: download.sizeLeft,
					episode: download.episode,
				})) || null,
			criticsRating: null,

			ratingKey: tvDetails.mediaInfo?.ratingKey || null,
			plexUrl: tvDetails.mediaInfo?.plexUrl || null,
			iOSPlexUrl: tvDetails.mediaInfo?.iOSPlexUrl || null,
		};

		return series;
	},
};

export default overseerr;
