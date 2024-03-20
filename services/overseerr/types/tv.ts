import {
	Genre,
	ProductionCompany,
	Cast,
	Crew,
	ExternalIds,
	WatchProvider,
	MediaInfo,
	RelatedVideo,
} from '@/services/overseerr/types/common';
import { PersonResult } from '@/services/overseerr/types/search';

export interface TvDetails {
	id: number;
	backdropPath: string | null;
	posterPath: string | null;
	contentRatings: {
		results: ContentRating[];
	};
	relatedVideos: RelatedVideo[];
	createdBy: PersonResult[];
	episodeRunTime: number[];
	firstAirDate: string | null;
	genres: Genre[];
	homepage: string | null;
	inProduction: boolean;
	languages: string[];
	lastAirDate: string | null;
	lastEpisodeToAir: Episode;
	name: string;
	nextEpisodeToAir: Episode;
	networks: ProductionCompany[];
	numberOfEpisodes: number;
	numberOfSeasons: number;
	originCountry: string[];
	originalLanguage: string;
	originalName: string;
	overview: string | null;
	popularity: number;
	productionCompanies: ProductionCompany[];
	productionCountries: ProductionCompany[];
	spokenLanguages: ProductionCompany[];
	seasons: Season[];
	status: string;
	tagline: string | null;
	type: string | null;
	voteAverage: number;
	voteCount: number;
	credits: {
		cast: Cast[];
		crew: Crew[];
	};
	externalIds: ExternalIds;
	keywords: Keyword[];
	mediaInfo?: MediaInfo;
	watchProviders: WatchProvider[];
}

export interface Season {
	id: number;
	airDate: string | null;
	episodeCount: number;
	name: string;
	overview: string;
	posterPath: string | null;
	seasonNumber: number;
	episodes: Episode[];
}

export interface Episode {
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
}

export interface Keyword {
	id: number;
	name: string;
}

export interface ContentRating {
	iso_3166_1: string;
	rating: string;
}
