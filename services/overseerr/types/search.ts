import { MediaType } from '@/app/types';
import { MediaInfo } from '@/services/overseerr/types/common';

export interface MovieResult {
	id: number;
	mediaType: MediaType.MOVIE;
	popularity: number | null;
	posterPath: string | null;
	backdropPath: string | null;
	voteCount: number | null;
	voteAverage: number | null;
	genreIds: number[];
	overview: string | null;
	originalLanguage: string | null;
	title: string;
	originalTitle: string | null;
	releaseDate: string | null;
	adult: boolean | null;
	video: boolean | null;
	mediaInfo?: MediaInfo;
}

export interface TvResult {
	id: number;
	mediaType: MediaType.TV;
	popularity: number | null;
	posterPath: string | null;
	backdropPath: string | null;
	voteCount: number | null;
	voteAverage: number | null;
	genreIds: number[];
	overview: string | null;
	originalLanguage: string | null;
	name: string;
	originalName: string | null;
	originCountry: string[];
	firstAirDate: string | null;
	mediaInfo?: MediaInfo;
}

export interface PersonResult {
	id: number;
	name: string;
	mediaType: MediaType.PERSON;
	popularity: number | null;
	profilePath: string | null;
	adult: boolean | null;
}

export interface Results {
	page: number;
	totalPages: number;
	totalResults: number;
	results: (MovieResult | TvResult | PersonResult)[];
}
