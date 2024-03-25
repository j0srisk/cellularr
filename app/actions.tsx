'use server';

import { demoApplications } from '@/app/config/demoData';
import demoData from '@/app/demoData.json';
import {
	MediaType,
	YamlData,
	ServiceSection,
	Service,
	Torrent,
	TorrentClient,
	Download,
	DownloadClient,
} from '@/app/types';
import deluge from '@/services/deluge';
import overseerr from '@/services/overseerr/overseerr';
import { Collection } from '@/services/overseerr/types/collection';
import { Genre } from '@/services/overseerr/types/common';
import { Rating } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { Radarr, RadarrSettings } from '@/services/overseerr/types/radarr';
import { Results } from '@/services/overseerr/types/search';
import { Sonarr, SonarrSettings } from '@/services/overseerr/types/sonarr';
import { TvDetails } from '@/services/overseerr/types/tv';
import { Users } from '@/services/overseerr/types/user';
import { User } from '@/services/overseerr/types/user';
import sabnzbd from '@/services/sabnzbd';
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

export async function getArrServers(
	mediaType: MediaType = MediaType.MOVIE || MediaType.COLLECTION || MediaType.TV,
) {
	if (mediaType === MediaType.MOVIE || mediaType === MediaType.COLLECTION) {
		const radarrServers: RadarrSettings[] = await overseerr.endpoint('/service/radarr');

		return radarrServers;
	}

	if (mediaType === MediaType.TV) {
		const sonarrServers: SonarrSettings[] = await overseerr.endpoint('/service/sonarr');

		return sonarrServers;
	}
}

export async function getArrServer(
	mediaType: MediaType = MediaType.MOVIE || MediaType.COLLECTION || MediaType.TV,
	id: number,
) {
	if (mediaType === MediaType.MOVIE || mediaType === MediaType.COLLECTION) {
		const radarr: Radarr = await overseerr.endpoint('/service/radarr/' + id);

		return radarr;
	}

	if (mediaType === MediaType.TV) {
		const sonarr: Sonarr = await overseerr.endpoint('/service/sonarr/' + id);

		return sonarr;
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
	seasons?: number[],
) {
	console.log(mediaType, id, serverId, profileId, userId, seasons);

	return 'success';
}

export async function getMovieGenres() {
	const genres: Genre[] = await overseerr.endpoint('/discover/genreslider/movie');

	return genres;
}

export async function getTvGenres() {
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

export async function getGenreTv(genreId: string, page: number = 1, language: string = 'en') {
	const results: Results = await overseerr.endpoint(
		'/discover/tv?genre=' + genreId + '&page=' + page + '&language=' + language,
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

export async function getServices() {
	const yamlFile = await fs.readFile(process.cwd() + '/config/services.yaml', 'utf8');
	const yamlData: YamlData[] = parse(yamlFile);

	const serviceSections: ServiceSection[] = [];

	yamlData.forEach((sectionData: { [key: string]: { [key: string]: any } }) => {
		const sectionName = Object.keys(sectionData)[0];
		const services: Service[] = [];

		// Iterate over each service in the section
		sectionData[sectionName].forEach((serviceData: { [key: string]: any }) => {
			const serviceName = Object.keys(serviceData)[0];
			const { icon, href } = serviceData[serviceName];
			services.push({
				name: serviceName,
				icon: icon || '',
				href: href || '',
			});
		});

		// Add section to applicationSections array
		serviceSections.push({
			name: sectionName,
			services,
		});
	});

	return serviceSections;
}

export async function getDownloads() {
	const yamlFile = await fs.readFile(process.cwd() + '/config/clients.yaml', 'utf8');
	const yamlData: YamlData[] = parse(yamlFile);

	const downloadClients: DownloadClient[] = [];

	const downloads: Download[] = [];

	// Use map instead of forEach to create an array of promises
	const clientPromises = yamlData.map(
		async (clientData: { [key: string]: { [key: string]: any } }) => {
			const clientName = Object.keys(clientData)[0];

			if (clientData.type === 'deluge') {
				const delugeDownloads = await getDelugeTorrents(
					clientData.url,
					clientData.password,
					clientName,
				);

				downloads.push(...delugeDownloads);
			}

			if (clientData.type === 'sabnzbd') {
				const sabnzbdDownloads = await getSabnzbdDownloads(
					clientData.url,
					clientData.key,
					clientName,
				);

				downloads.push(...sabnzbdDownloads);
			}

			return null;
		},
	);

	// Wait for all promises to resolve using Promise.all()
	const resolvedClients = await Promise.all(clientPromises);

	// Filter out null values and add resolved clients to downloadClients array
	resolvedClients
		.filter((client) => client !== null)
		.forEach((client) => downloadClients.push(client));

	return downloads;
}

export async function getDelugeTorrents(url: string, password: string, clientName: string) {
	const delugeClient = deluge(url, password);

	const data = await delugeClient.request('web.update_ui', [
		[
			'queue',
			'name',
			'total_wanted',
			'state',
			'progress',
			'download_payload_rate',
			'upload_payload_rate',
			'total_remaining',
		],
		{},
	]);

	const downloads: Download[] = Object.entries(data.result.torrents).map(([id, torrent]) => ({
		id,
		client: {
			name: clientName,
			type: 'deluge',
		},
		progress: torrent.progress,
		state: torrent.state,
		name: torrent.name,
		size: torrent.total_wanted,
		downloaded: torrent.total_wanted - torrent.total_remaining,
		remaining: torrent.total_remaining,
		uploadSpeed: torrent.upload_payload_rate,
		downloadSpeed: torrent.download_payload_rate,
		eta:
			torrent.download_payload_rate > 0
				? Math.round((torrent.total_remaining / torrent.download_payload_rate) * 1000)
				: Infinity,
	}));

	return downloads;
}

export async function getSabnzbdDownloads(url: string, key: string, clientName: string) {
	const sabnzbdClient = sabnzbd(url, key);
	const data = await sabnzbdClient.mode('queue');

	const downloads: Download[] = data.queue.slots.map((slot) => ({
		id: slot.nzo_id,
		client: {
			name: clientName,
			type: 'sabnzbd',
		},
		progress: ((parseFloat(slot.mb) - parseFloat(slot.mbleft)) / parseFloat(slot.mb)) * 100,
		state: slot.status,
		name: slot.filename,
		size: Math.round(parseFloat(slot.mb) * 1024 * 1024),
		downloaded: Math.round((parseFloat(slot.mb) - parseFloat(slot.mbleft)) * 1024 * 1024),
		remaining: Math.round(parseFloat(slot.mbleft) * 1024 * 1024),
		downloadSpeed: slot.index === 0 ? Math.round(parseFloat(data.queue.kbpersec) * 1024) : 0,
		eta:
			slot.index === 0 && parseFloat(data.queue.kbpersec) > 0
				? Math.round(
						(Math.round(parseFloat(slot.mbleft) * 1024 * 1024) /
							Math.round(parseFloat(data.queue.kbpersec) * 1024)) *
							1000,
					)
				: Infinity,
	}));

	return downloads;
}
