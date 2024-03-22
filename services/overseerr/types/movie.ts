import { MediaType } from '@/app/types';
import { Collection } from '@/services/overseerr/types/collection';
import {
	Genre,
	RelatedVideo,
	ProductionCompany,
	ProductionCountry,
	SpokenLanguage,
	Cast,
	Crew,
	ExternalIds,
	WatchProvider,
	MediaInfo,
} from '@/services/overseerr/types/common';

export interface MovieDetails {
	id: number;
	mediaType: MediaType.MOVIE;
	imdbId: string;
	adult: boolean;
	backdropPath: string | null;
	posterPath: string | null;
	budget: number | null;
	genres: Genre[];
	homepage: string | null;
	relatedVideos: RelatedVideo[];
	originalLanguage: string;
	originalTitle: string;
	overview: string | null;
	popularity: number;
	productionCompanies: ProductionCompany[];
	productionCountries: ProductionCountry[];
	releaseDate: string;
	releases: {
		results: release[];
	};
	revenue: number | null;
	runtime: number | null;
	spokenLanguages: SpokenLanguage[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	voteAverage: number;
	voteCount: number;
	credits: {
		cast: Cast[];
		crew: Crew[];
	};
	collection?: Collection;
	externalIds: ExternalIds;
	watchproviders: WatchProvider[];
	mediaInfo?: MediaInfo;
}

export interface release {
	iso_3166_1: string;
	rating?: string;
	release_dates: ReleaseDate[];
}

export interface ReleaseDate {
	certification: string;
	iso_639_1: string | null;
	note: string | null;
	release_date: string;
	type: number;
}
