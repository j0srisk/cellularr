import { Movie, MediaDetail } from './typess';

export function CreatePosterUrl(posterPath?: String) {
	if (posterPath === null || posterPath === undefined) {
		return;
	}
	return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath;
}

export function CreateBackdropUrl(backdropPath?: String) {
	if (backdropPath === null || backdropPath === undefined) {
		return;
	}
	return 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + backdropPath;
}

export function CreateProfileUrl(profilePath: String | null) {
	if (profilePath === null || profilePath === undefined) {
		return;
	}
	return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + profilePath;
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

export function FormatReleaseDate(releaseDate: string) {
	if (releaseDate === null || releaseDate === undefined) {
		return;
	}
	const date = new Date(releaseDate);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function createMovieDetails(movie: Movie) {
	const movieDetails: MediaDetail[] = [];

	movieDetails.push({ key: 'Release Status', values: [movie.metadata.status] });
	movieDetails.push({ key: 'Release Date', values: [movie.metadata.releaseDate] });

	if (movie.metadata.budget) {
		movieDetails.push({ key: 'Budget', values: ['$' + movie.metadata.budget.toLocaleString()] });
	}

	if (movie.metadata.revenue) {
		movieDetails.push({
			key: 'Revenue',
			values: ['$' + movie.metadata.revenue.toLocaleString()],
		});
	}

	if (movie.files) {
		if (movie.files[0].fullResolution) {
			movieDetails.push({ key: 'Resolution', values: [movie.files[0].fullResolution] });
		}
		if (movie.files[0].size) {
			movieDetails.push({
				key: 'File Size',
				values: [`${(movie.files[0].size / (1024 * 1024 * 1024)).toFixed(2)} GB`],
			});
		}
		if (movie.files[0].subtitles.length > 0) {
			movieDetails.push({
				key: 'Subtitles',
				values: movie.files[0].subtitles.map((subtitle) => subtitle.language),
			});
		}
	}

	return movieDetails;
}
