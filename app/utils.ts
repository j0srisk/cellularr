export function CreatePosterUrl(posterPath: String | null) {
	if (posterPath === null) {
		return;
	} else {
		return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath;
	}
}

export function CreateBackdropUrl(backdropPath: String | null) {
	if (backdropPath === null) {
		return;
	} else {
		return 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + backdropPath;
	}
}

export function CreateProfileUrl(profilePath: String | null) {
	if (profilePath === null) {
		return;
	} else {
		return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + profilePath;
	}
}
