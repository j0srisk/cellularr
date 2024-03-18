export enum MediaType {
	MOVIE = 'movie',
	TV = 'tv',
	COLLECTION = 'collection',
	PERSON = 'person',
	MUSIC = 'music',
}

export enum MediaStatus {
	UNKNOWN = 1,
	PENDING = 2,
	PROCESSING = 3,
	PARTIALLY_AVAILABLE = 4,
	AVAILABLE = 5,
}

export type SeriesMetadata = {
	mediaType: MediaType.TV;
	id: number;
	name: string;
	overview: string;
	tagline?: string;
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
	contentRatings: ContentRating[];
};

export type Series = {
	mediaType: MediaType.TV;
	metadata: SeriesMetadata;
	seasons: Season[];
	ratings: Ratings;
	info?: MediaInfo;
	similar?: RelatedMediaMetadata[];
	recommendations?: RelatedMediaMetadata[];
};

export type MovieMetadata = RelatedMediaMetadata & {
	backdropPath: string;
	budget: number;
	overview: string;
	releaseDate: string;
	revenue: number | null;
	runtime: number;
	status: string;
	tagline?: string;
	title: string;
	cast: Cast[];
	releases: Release[];
};

export type RelatedMediaMetadata = {
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
	status: number;
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
};

export type Movie = {
	mediaType: MediaType.MOVIE;
	metadata: MovieMetadata;
	ratings: Ratings;
	info?: MediaInfo;
	files?: File[];
	recommendations: RelatedMediaMetadata[];
	similar: RelatedMediaMetadata[];
};

export type RelatedMedia = {
	mediaType: MediaType;
	id: number;
	title: string;
	posterPath: string;
};

export type MediaDetail = {
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
