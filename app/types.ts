export type MovieDetails = {
	mediaType: MediaType;
	id: number;
	backdropPath: string;
	posterPath: string;
	genres: Genre[];
	relatedVideos: RelatedVideo[];
	overview: string;
	productionCompanies: ProductionCompany[];
	releaseDate: string;
	budget: number | null;
	revenue: number | null;
	runtime: number;
	status: MediaStatus;
	title: string;
	credits: Credits;
	collection: Collection;
	mediaInfo: MediaInfo;
	//
	rating: Rating;
	tatutulliMetadata: FileMetadata;
};

export type TvDetails = {
	id: number;
	mediaType: MediaType.TV;
	backdropPath: string;
	posterPath: string;
	firstAirDate: string;
	lastAirDate: string;
	genres: Genre[];
	name: string;
	mediaInfo: MediaInfo;
	overview: string;
	episodeRunTime: number[];
	numberOfSeasons: number;
	numberOfEpisodes: number;
	credits: Credits;
	status: string;
	networks: Network[];
	seasons: Season[];
	contentRatings: ContentRatings;
};

export interface Genre {
	id: number | null;
	name: string | null;
}

export interface RelatedVideo {
	url: string;
	key: string;
	name: string;
	size: number;
	type: string;
	site: string;
}

export interface ProductionCompany {
	id: number | null;
	logoPath: string | null;
	name: string | null;
	originCountry: string | null;
}

export interface ProductionCountry {
	iso31661: string | null;
	name: string | null;
}

export interface SpokenLanguage {
	englishName: string | null;
	iso6391: string | null;
	name: string | null;
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

export interface Credits {
	cast: Cast[];
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

export interface MediaInfo {
	downloadStatus: DownloadingItem[] | null;
	downloadStatus4k: DownloadingItem[] | null;
	id: number | null;
	tmdbId: number | null;
	tvdbId: number | null;
	status: MediaStatus;
	status4k: MediaStatus;
	//requests: Request[] | null;
	createdAt: Date | null;
	updatedAt: Date | null;
	mediaAddedAt: Date | null;
	ratingKey: string | null;
	ratingKey4k: string | null;
	plexUrl: string | null;
	iOSPlexUrl: string | null;
	serviceUrl: string | null;
}

export interface DownloadingItem {
	mediaType: MediaType;
	externalId: number;
	size: number;
	sizeLeft: number;
	status: string;
	timeLeft: string;
	estimatedCompletionTime: Date;
	title: string;
	//episode?: EpisodeNumberResult;
}

export enum MediaType {
	MOVIE = 'movie',
	TV = 'tv',
}

export enum MediaStatus {
	UNKNOWN = 1,
	PENDING = 2,
	PROCESSING = 3,
	PARTIALLY_AVAILABLE = 4,
	AVAILABLE = 5,
}

export type Download = {
	id: string | null;
	name: string | null;
	status: string | null;
	size: number;
	sizeLeft: number;
};

export type Session = {
	id: string | null;
	title: string | null;
	mediaType: string | null;
	progress: string | null;
	user: string | null;
	userThumb: string | null;
	player: string | null;
	year: string | null;
	posterPath: string | null;
	backdropPath: string | null;
	ratingKey: string | null;
	duration?: number;
};

export type FileMetadata = {
	mediaType: MediaType;
	contentRating?: string;
	ratingKey: string;
	resolution: string;
	videoCodec: string;
	audioCodec: string;
	audioChannelLayout: string;
	dynamicRange: string;
	audios: Audio[];
	subtitles: Subtitle[];
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

export type Collection = {
	id: number;
	name: string;
	overview: string;
	posterPath: string;
	backdropPath: string;
	parts?: MovieDetails[];
};

export type Network = {
	id: number;
	name: string;
	logoPath: string;
	originCountry: string;
};

export type Season = {
	id: number;
	airDate: string | null;
	episodeCount: number;
	name: string;
	overview: string;
	posterPath: string;
	seasonNumber: number;
	episodes: Episode[];
};

export type Episode = {
	id: number;
	name: string;
	airDate: string | null;
	episodeNumber: number;
	overview: string;
	productionCode: string;
	seasonNumber: number;
	showId: number;
	stillPath: string | null;
	voteAverage: number;
	voteCount: number;
};

export type ContentRating = {
	descriptors: string[];
	iso_3166_1: string;
	rating: string;
};

export type ContentRatings = {
	results: ContentRating[];
};
