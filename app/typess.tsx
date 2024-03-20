export enum MediaType {
	MOVIE = 'movie',
	TV = 'tv',
	COLLECTION = 'collection',
	PERSON = 'person',
	MUSIC = 'music',
}

export enum MediaStatus {
	'Unknown' = 1,
	'Pending' = 2,
	'Processing' = 3,
	'Partially Available' = 4,
	'Available' = 5,
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

export type SeriesMetadata = {
	mediaType: MediaType.TV;
	id: number;
	name: string;
	overview: string;
	tagline?: string;
	trailerUrl?: string;
	posterPath?: string;
	backdropPath?: string;
	numberOfSeasons: number;
	numberOfEpisodes: number;
	firstAirDate: string;
	lastAirDate: string;
	networks: Network[];
	status: string;
	type: string;
	cast: Cast[];
	certification: string;
};

export type Series = {
	mediaType: MediaType.TV;
	metadata: SeriesMetadata;
	seasons: Season[];
	ratings: Ratings;
	info?: MediaInfo;
	similar?: MediaMetadata[];
	recommendations?: MediaMetadata[];
};

export type MovieMetadata = MediaMetadata & {
	budget?: number;
	revenue?: number;
	runtime: number;
	status: string;
	tagline?: string;
	trailerUrl?: string;
	originalLanguage: string;
	certification: string;
	collection?: Collection;
	cast: Cast[];
	releases: Release[];
};

export type MediaMetadata = {
	mediaType: MediaType;
	id: number;
	title: string;
	releaseDate: string;
	overview: string;
	posterPath: string;
	backdropPath: string;
};

export type MediaInfo = {
	mediaType: MediaType;
	id: number;
	tmdbId: number;
	requestStatus: MediaStatus;
	ratingKey: number;
	plexUrl: string;
	iOSPlexUrl: string;
	serviceUrl: string;
};

export interface ReleaseDate {
	certification: string;
	release_date: string;
	type: number;
}

export interface Release {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}

export type File = {
	id: number;
	resolution: string;
	fullResolution: string;
	size: number;
	subtitles: Subtitle[];
};

export type Subtitle = {
	id: number;
	language: string;
	languageCode: string;
};

export interface Cast {
	castId: number;
	character: string;
	creditId: string;
	id: number;
	name: string;
	order: number;
	gender: number;
	profilePath: string;
}

export type Ratings = {
	rottenTomatoes?: RottenTomatoes;
};

export type RottenTomatoes = {
	url?: string;
	criticsScore?: number;
	criticsRating?: string;
	audienceScore?: number;
	audienceRating?: string;
};

export type Movie = {
	mediaType: MediaType.MOVIE;
	metadata: MovieMetadata;
	ratings: Ratings;
	info?: MediaInfo;
	files?: File[];
	recommendations: MediaMetadata[];
	similar: MediaMetadata[];
};

export type RelatedMedia = {
	mediaType: MediaType;
	id: number;
	title: string;
	posterPath: string;
};

export type MediaFact = {
	key: string;
	values: string[];
};

export type ContentRating = {
	iso_3166_1: string;
	rating: string;
};

export type Network = {
	id: number;
	name: string;
	country: string;
	logoPath: string;
};

export type Season = {
	id: number;
	seasonNumber: number;
	name: string;
	requestStatus: MediaStatus;
	posterPath: string;
	episodeCount: number;
};

export type ArrServer = {
	id: number;
	name: string;
	isDefault: boolean;
	activeProfileId: number;
};

export type ArrProfile = {
	id: number;
	name: string;
};

export type User = {
	id: number;
	username: string;
	email: string;
	avatar: string;
	isDefault: boolean;
};

export type Collection = {
	id: number;
	mediaType: MediaType.COLLECTION;
	name: string;
	overview?: string;
	posterPath?: string;
	backdropPath?: string;
	parts: MediaMetadata[];
};

export const posterUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
