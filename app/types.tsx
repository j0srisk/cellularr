import { SeasonDetails, SeasonInfo } from '@/services/overseerr/types/tv';

export const posterUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
export const backdropUrl = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';

export enum MediaType {
	MOVIE = 'movie',
	TV = 'tv',
	COLLECTION = 'collection',
	PERSON = 'person',
	MUSIC = 'music',
}

export enum UnitedStatesCertification {
	'G' = 'G',
	'PG' = 'PG',
	'PG-13' = 'PG-13',
	'R' = 'R',
	'NC-17' = 'NC-17',
	'TV-MA' = 'TV-MA',
	'TV-14' = 'TV-14',
	'TV-PG' = 'TV-PG',
	'TV-G' = 'TV-G',
	'TV-Y7' = 'TV-Y7',
	'TV-Y' = 'TV-Y',
}

export type MediaFact = {
	key: string;
	values: string[];
};

export type CombinedSeason = {
	seasonDetails: SeasonDetails;
	seasonInfo?: SeasonInfo;
};

export interface YamlData {
	[sectionName: string]: {
		[serviceName: string]: {
			icon?: string;
			href?: string;
		};
	};
}

export type ServiceSection = {
	name: string;
	services?: Service[];
};

export type Service = {
	name: string;
	icon: string;
	href: string;
};

export type DownloadClient = {
	name: string;
	type: 'deluge' | 'sabnzbd';
};

export type Download = {
	id: string;
	client: DownloadClient;
	progress: number;
	state: string;
	name: string;
	size: number;
	downloaded: number;
	remaining: number;
	uploadSpeed?: number;
	downloadSpeed: number;
	eta: number;
};
