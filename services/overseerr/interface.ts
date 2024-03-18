export interface MovieDetails {
	id: number;
	backdropPath: string;
	posterPath: string;
	budget: number;
	overview: string;
	releaseDate: string;
	revenue: number | null;
	runtime: number;
	status: string;
	tagline: string;
	title: string;
	credits: {
		cast: Cast[];
	};
	releases: {
		results: Release[];
	};
	mediaInfo?: MediaInfo;
}

export interface Cast {
	id: number;
	castId: number;
	character: string;
	creditId: string;
	gender: number;
	name: string;
	order: number;
	profilePath: string;
}

export interface ReleaseDate {
	certification: string;
	release_date: string;
	type: number;
}

export interface Release {
	iso_3166_1: string;
	release_dates: ReleaseDate[];
}

export enum CriticsRating {
	Rotten = 'Rotten',
	Fresh = 'Fresh',
	CertifiedFresh = 'Certified Fresh',
}

export enum AudienceRating {
	Spilled = 'Spilled',
	Upright = 'Upright',
}

export interface MovieRatings {
	title: string;
	year: number;
	url: string;
	criticsScore: number;
	criticsRating: CriticsRating;
	audienceScore: number;
	audienceRating: AudienceRating;
}

export enum MediaStatus {
	'Unknown' = 1,
	'Pending' = 2,
	'Processing' = 3,
	'Partially Available' = 4,
	'Available' = 5,
}

export interface MediaInfo {
	id: number;
	mediaType: string;
	tmdbId: number;
	tvdbId: number;
	imdbId: string;
	status: MediaStatus;
	ratingKey: number;
	plexUrl: string;
	iOSPlexUrl: string;
	serviceUrl: string;
}
