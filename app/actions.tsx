'use server';

import { demoApplications, demoSessions } from '@/app/config/demoData';
import demoData from '@/app/demoData.json';
import { MediaType } from '@/app/types';
import overseerr from '@/services/overseerr/overseerr';
import { Collection } from '@/services/overseerr/types/collection';
import { Genre } from '@/services/overseerr/types/common';
import { Rating } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { Radarr, RadarrServers } from '@/services/overseerr/types/radarr';
import { Results } from '@/services/overseerr/types/search';
import { TvDetails } from '@/services/overseerr/types/tv';
import { Users } from '@/services/overseerr/types/user';
import { User } from '@/services/overseerr/types/user';
import tautulli from '@/services/tautulli/tautulli';
import { ActivityData } from '@/services/tautulli/types/activity';
import { Location } from '@/services/tautulli/types/location';
import { Media } from '@/services/tautulli/types/media';
import { promises as fs } from 'fs';
import { parse } from 'yaml';

export async function getSearchResults(query: string, page?: number, language?: string) {
	if (!page) page = 1;
	if (!language) language = 'en';
	const results: Results = await overseerr.endpoint(
		'/search' + '?query=' + query + '&page=' + page + '&language=' + language,
	);

	return results;
}

export async function getMediaDetails(mediaType: MediaType, id: number) {
	if (mediaType === MediaType.MOVIE) {
		const movieDetails: MovieDetails = await overseerr.endpoint('/movie/' + id);

		return movieDetails;
	}

	if (mediaType === MediaType.TV) {
		const tvDetails: TvDetails = await overseerr.endpoint('/tv/' + id);

		return tvDetails;
	}
}

export async function getMovieDetails(id: number) {
	const movieDetails: MovieDetails = await overseerr.endpoint('/movie/' + id);

	return movieDetails;
}

export async function getTvDetails(id: number) {
	const tvDetails: TvDetails = await overseerr.endpoint('/tv/' + id);

	return tvDetails;
}

export async function getCollection(id: number) {
	const collection: Collection = await overseerr.endpoint('/collection/' + id);

	return collection;
}

export async function getRatings(mediaType: MediaType.MOVIE | MediaType.TV, id: number) {
	if (mediaType === MediaType.MOVIE) {
		const ratingsReturned: Rating = await overseerr.endpoint('/movie/' + id + '/ratings');

		return ratingsReturned;
	}

	if (mediaType === MediaType.TV) {
		const ratingsReturned: Rating = await overseerr.endpoint('/tv/' + id + '/ratings');

		return ratingsReturned;
	}
}

export async function getRecommendations(
	mediaType: MediaType.MOVIE | MediaType.TV,
	id: number,
	page: number = 1,
) {
	if (mediaType === MediaType.MOVIE) {
		const listOfMovies: Results = await overseerr.endpoint(
			'/movie/' + id + '/recommendations' + '?page=' + page,
		);

		return listOfMovies;
	}

	if (mediaType === MediaType.TV) {
		const listOfSeries: Results = await overseerr.endpoint(
			'/tv/' + id + '/recommendations' + '?page=' + page,
		);

		return listOfSeries;
	}
}

export async function getSimilar(
	mediaType: MediaType.MOVIE | MediaType.TV,
	id: number,
	page: number = 1,
) {
	if (mediaType === MediaType.MOVIE) {
		const listOfMovies: Results = await overseerr.endpoint(
			'/movie/' + id + '/similar' + '?page=' + page,
		);

		return listOfMovies;
	}

	if (mediaType === MediaType.TV) {
		const listOfSeries: Results = await overseerr.endpoint(
			'/tv/' + id + '/similar' + '?page=' + page,
		);

		return listOfSeries;
	}
}

export async function getArrServers(mediaType: MediaType = MediaType.MOVIE) {
	if (mediaType === MediaType.MOVIE) {
		const radarrServers: RadarrServers = await overseerr.endpoint('/service/radarr');

		return radarrServers;
	}
}

export async function getArrServer(mediaType: MediaType = MediaType.MOVIE, id: number) {
	console.log(mediaType, id);
	if (mediaType === MediaType.MOVIE) {
		const radarr: Radarr = await overseerr.endpoint('/service/radarr/' + id);

		console.log(radarr);

		return radarr;
	}
}

export async function getUsers() {
	//TODO: Get more than 10 users
	const users: Users = await overseerr.endpoint('/user');

	return users;
}

export async function getCurrentUser() {
	const currentUser: User = await overseerr.endpoint('/auth/me');

	return currentUser;
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

export async function getMovieGenres() {
	const genres: Genre[] = await overseerr.endpoint('/discover/genreslider/movie');

	return genres;
}

export async function getSeriesGenres() {
	const genres: Genre[] = await overseerr.endpoint('/discover/genreslider/tv');

	return genres;
}

export async function getSearch(query: string, page: number = 1, language: string = 'en') {
	const results: Results = await overseerr.endpoint(
		'/search?query=' + query + '&page=' + page + '&language=' + language,
	);

	return results;
}

export async function getTrending(query: string, page: number = 1, language: string = 'en') {
	const results: Results = await overseerr.endpoint(
		'/discover/trending?page=' + page + '&language=' + language,
	);

	return results;
}

export async function getWatchlist(query: string, page: number = 1, language: string = 'en') {
	const results: Results = await overseerr.endpoint('/discover/watchlist?page=' + page);

	console.log(results);

	return results;
}

export async function getGenreMovies(genreId: string, page: number = 1, language: string = 'en') {
	const results: Results = await overseerr.endpoint(
		'/discover/movies?genre=' + genreId + '&page=' + page + '&language=' + language,
	);

	return results;
}

export async function getActivityData() {
	if (process.env.DEMO_MODE === 'true') {
		const activityData: ActivityData = demoData.activityData;
		return activityData;
	}

	//const activityData: ActivityData = await tautulli.command('get_activity');

	const activityData: ActivityData = demoData.activityData;

	return activityData;
}

export async function getLocation(ipAddress: string) {
	const geolocationDetails: Location = await tautulli.command(
		'get_geoip_lookup&ip_address=' + ipAddress,
	);

	return geolocationDetails;
}

export async function getFiles(ratingKey: number) {
	const media: Media = await tautulli.command('get_metadata&rating_key=' + ratingKey);

	return media.media_info;
}

export async function GetApplications() {
	if (process.env.DEMO_MODE === 'true') {
		console.log('DEMO MODE: using demo applications');
		return demoApplications;
	}

	try {
		let yamlFilePath = '/app/config/applications.yaml';

		//if not running in docker, use local config file
		//todo: maybe remove this check?
		if (!process.env.DOCKER) {
			yamlFilePath = process.cwd() + '/app/config/applications.yaml';
		}

		const yamlFile = await fs.readFile(yamlFilePath, 'utf8');
		const yamlData = parse(yamlFile);
		return yamlData;
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return null;
		} else {
			throw error;
		}
	}
}
