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

//old tautulli types to be removed
export type File = {
	resolution: string;
	videoCodec: string;
	audioCodec: string;
	audioChannelLayout: string;
	dynamicRange: string;
	audios: Audio[];
	subtitles: Subtitle[];
};

export type Session = {
	id: string;
	grandparentTitle: string | null;
	parentTitle: string | null;
	title: string;
	mediaType: MediaType;
	transcodeProgress: number | null;
	progress: number;
	user: string;
	userThumb: string;
	player: string;
	year: string;
	posterPath?: string;
	backdropPath?: string;
	ratingKey: string;
	duration: number;
	season?: number;
	episode?: number;
	tmdbId: number;
	state: string;
	city: string | null;
	region: string | null;
};

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
