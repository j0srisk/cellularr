export type Movie = {
	mediaType: MediaType.MOVIE;
	id: number;
	backdropPath: string | null;
	posterPath: string | null;
	genre: string;
	relatedVideos: RelatedVideo[];
	overview: string;
	releaseDate: string;
	runtime: number;
	title: string;
	cast: Cast[];
	collection: Collection | null;
	rating: Rating;
	contentRating: string;
	productionCompany: string | null;
	budget: number | null;
	revenue: number | null;

	requestStatus: MediaStatus | null;
	ratingKey: number | null;
	plexUrl: string | null;
	iOSPlexUrl: string | null;

	file: File | null;
};

export type Collection = {
	mediaType: MediaType.COLLECTION;
	id: number;
	name: string;
	overview: string;
	posterPath: string | null;
	backdropPath: string | null;
	movies: Movie[];
};

export type Series = {
	mediaType: MediaType.TV;
	id: number;
	backdropPath: string | null;
	posterPath: string | null;
	genre: string;
	overview: string;
	firstAirDate: string;
	lastAirDate: string | null;
	name: string;
	episodeRunTime: number;
	numberOfSeasons: number;
	numberOfEpisodes: number;
	cast: Cast[];
	contentRating: string;
	seasons: Season[];
	network: string;
	status: string;

	downloads: Download[] | null;
	requestStatus: MediaStatus | null;
	ratingKey: number | null;
	plexUrl: string | null;
	iOSPlexUrl: string | null;
};

export type Season = {
	id: number;
	airDate: string;
	episodeCount: number;
	name: string;
	overview: string;
	posterPath: string | null;
	seasonNumber: number;
	episodes: Episode[];
	requestStatus: MediaStatus | null;
};

export type Episode = {
	id: number;
	title: string;
	airDate: string;
	episodeNumber: number;
	overview: string;
	seasonNumber: number;
	stillPath: string | null;
};

export type File = {
	resolution: string;
	videoCodec: string;
	audioCodec: string;
	audioChannelLayout: string;
	dynamicRange: string;
	audios: Audio[];
	subtitles: Subtitle[];
};

export type Download = {
	id: string;
	name: string;
	estimatedCompletionTime: string | null;
	status: string;
	size: number;
	sizeLeft: number;
	episode: Episode | null;
};

export interface RelatedVideo {
	url: string;
	key: string;
	name: string;
	size: number;
	type: string;
	site: string;
}

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

export enum MediaType {
	MOVIE = 'movie',
	TV = 'tv',
	COLLECTION = 'collection',
	PERSON = 'person',
}

export enum MediaStatus {
	UNKNOWN = 1,
	PENDING = 2,
	PROCESSING = 3,
	PARTIALLY_AVAILABLE = 4,
	AVAILABLE = 5,
}

export type Session = {
	id: string;
	title: string;
	mediaType: string;
	progress: number;
	user: string;
	userThumb: string;
	player: string;
	year: string;
	posterPath: string | null;
	backdropPath: string | null;
	ratingKey: string;
	duration: number;
	season?: number;
	episode?: number;
	tmdbId?: number;
	state: string;
};

export interface Rating {
	title: string;
	year: number;
	url: string;
	criticsScore?: number;
	criticsRating?: string;
	audienceScore?: number;
	audienceRating?: string;
}

export type Audio = {
	id: string;
	language: string;
	languageCode: string;
};

export type Subtitle = {
	id: string;
	language: string;
	languageCode: string;
};

export type LocalStorageMediaItem = {
	id: number;
	mediaType: MediaType;
	posterPath: string | null;
	title: string;
	year: string;
};

export type SearchResult = {
	id: number;
	title?: string;
	name?: string;
	posterPath: string | null;
	mediaType: MediaType;
	releaseDate?: string;
	firstAirDate?: string;
};
