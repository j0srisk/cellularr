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

export function FormatDuration(durationInMinutes: number) {
	const hours = Math.floor(durationInMinutes / 60);
	const minutes = durationInMinutes % 60;

	let hourString = hours === 1 ? ' hr' : ' hrs';
	let minuteString = minutes === 1 ? ' min' : ' mins';

	if (hours === 0) {
		return minutes + minuteString;
	} else if (minutes === 0) {
		return hours + hourString;
	}

	return hours + hourString + ' ' + minutes + minuteString;
}
