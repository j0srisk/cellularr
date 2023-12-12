//commented out properties are ones im too lazy to add
export interface MovieDetails {
	//hardcoded to movie so I can use MovieDetails instead of MovieResult
	mediaType: MediaType.MOVIE;
	id: number | null;
	imdbId: string | null;
	adult: boolean | null;
	backdropPath: string | null;
	posterPath: string | null;
	budget: number | null;
	genres: Genre[] | null;
	homepage: string | null;
	originalLanguage: string | null;
	originalTitle: string | null;
	overview: string | null;
	popularity: number | null;
	productionCompanies: ProductionCompany[] | null;
	productionCountries: ProductionCountry[] | null;
	releaseDate: string | null;
	revenue: number | null;
	runtime: number | null;
	spokenLanguages: SpokenLanguage[] | null;
	status: string | null;
	tagline: string | null;
	title: string;
	video: boolean | null;
	voteAverage: number | null;
	voteCount: number | null;
	externalIds: ExternalIds | null;
	mediaInfo: Media | null;
	credits: Credits | null;
}

export interface Genre {
	id: number | null;
	name: string | null;
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

export interface Media {
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
