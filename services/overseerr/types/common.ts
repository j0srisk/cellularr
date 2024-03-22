import { MediaType } from '@/app/types';
import { Season } from '@/services/overseerr/types/tv';

export enum MediaStatus {
	'Unknown' = 1,
	'Pending' = 2,
	'Processing' = 3,
	'Partially Available' = 4,
	'Available' = 5,
}

export enum RelatedVideoType {
	CLIP = 'Clip',
	TEASER = 'Teaser',
	TRAILER = 'Trailer',
	FEATURETTE = 'Featurette',
	OPENING_CREDITS = 'Opening Credits',
	BEHIND_THE_SCENES = 'Behind the Scenes',
	BLOOPERS = 'Bloopers',
}

export interface MediaInfo {
	//downloadStatus: string;
	//downloadStatus4k: string;
	id: number;
	mediaType: MediaType;
	tmdbId: number;
	tvdbId: number | null;
	imdbId: string | null;
	status: MediaStatus;
	status4k: MediaStatus;
	createdAt: string;
	updatedAt: string;
	lastSeasonChanged: string;
	mediaAddedAt: string;
	serviceId: number | null;
	serviceId4k: number | null;
	externalServiceId: string | null;
	externalServiceId4k: string | null;
	externalServiceSlug: string | null;
	externalServiceSlug4k: string | null;
	//TODO: ensure ratingKey's are always numbers
	ratingKey: number | null;
	ratingKey4k: number | null;
	//TODO: add requests and issues
	//requests: Request[];
	//issues: Issue[];
	seasons: Season[];
	plexUrl?: string;
	iOSPlexUrl?: string;
	plexUrl4k?: string;
	iOSPlexUrl4k?: string;
	serviceUrl?: string;
}

export interface Genre {
	id: number;
	name: string;
	backdrops?: string[];
}

export interface RelatedVideo {
	url: string;
	key: string;
	name: string;
	size: number;
	type: RelatedVideoType;
}

export interface ProductionCompany {
	id: number;
	name: string;
	logoPath: string | null;
	originCountry: string | null;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	englishName: string | null;
	iso_639_1: string;
	name: string;
}

export interface Cast {
	id: number;
	castId: number;
	character: string | null;
	creditId: string;
	gender: number | null;
	name: string;
	order: number;
	profilePath: string | null;
}

export interface Crew {
	id: number;
	creditId: string;
	gender: number | null;
	name: string;
	job: string;
	department: string;
	profilePath: string | null;
}

export interface ExternalIds {
	facebookId: string | null;
	freebaseId: string | null;
	freebaseMid: string | null;
	imdbId: string | null;
	instagramId: string | null;
	tvdbId: number | null;
	tvrageId: number | null;
	twitterId: string | null;
}

export interface WatchProvider {
	iso_3166_1: string;
	link: string;
	buy: WatchProviderDetails[];
	flatrate: WatchProviderDetails[];
}

export interface WatchProviderDetails {
	displayPriority: number;
	logoPath: string;
	id: number;
	name: string;
}

export interface Rating {
	title: string;
	year: number;
	url: string;
	criticsScore: number;
	criticsRating: string;
	audienceScore: number | null;
	audienceRating: string | null;
}

export interface PageInfo {
	page: number;
	totalResults: number;
	totalPages: number;
}

export interface ServiceProfile {
	id: number;
	name: string;
}
