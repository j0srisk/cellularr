import { Movie, Series, MediaStatus, MediaFact } from '@/app/typess';
import ISO6391 from 'iso-639-1';

export function CreatePosterUrl(posterPath?: String) {
	if (posterPath === null || posterPath === undefined) {
		return;
	}
	return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath;
}

export function CreateBackdropUrl(backdropPath: String) {
	return 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces' + backdropPath;
}

export function CreateProfileUrl(profilePath: String | null) {
	if (profilePath === null || profilePath === undefined) {
		return;
	}
	return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + profilePath;
}

export function formatDuration(durationInMinutes: number) {
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

export function formatReleaseDate(releaseDate: string) {
	const dateParts = releaseDate.split('-');
	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]) - 1;
	const day = parseInt(dateParts[2]);
	const formattedDate = new Date(year, month, day).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	return formattedDate;
}

export function createMovieFacts(movie: Movie) {
	const movieFacts: MediaFact[] = [];

	if (movie.metadata.status) {
		movieFacts.push({ key: 'Release Status', values: [movie.metadata.status] });
	}

	if (movie.metadata.releaseDate) {
		movieFacts.push({
			key: 'Release Date',
			values: [formatReleaseDate(movie.metadata.releaseDate)],
		});
	}

	if (movie.metadata.originalLanguage) {
		const language = ISO6391.getName(movie.metadata.originalLanguage);
		if (language) {
			movieFacts.push({ key: 'Original Language', values: [language] });
		}
	}

	if (movie.metadata.budget) {
		movieFacts.push({ key: 'Budget', values: ['$' + movie.metadata.budget.toLocaleString()] });
	}

	if (movie.metadata.revenue) {
		movieFacts.push({
			key: 'Revenue',
			values: ['$' + movie.metadata.revenue.toLocaleString()],
		});
	}

	movieFacts.push({
		key: 'Request Status',
		values: movie.info ? [MediaStatus[movie.info?.requestStatus]] : ['Unrequested'],
	});

	if (movie.files) {
		if (movie.files[0].fullResolution) {
			movieFacts.push({ key: 'Resolution', values: [movie.files[0].fullResolution] });
		}
		if (movie.files[0].size) {
			movieFacts.push({
				key: 'File Size',
				values: [`${(movie.files[0].size / (1024 * 1024 * 1024)).toFixed(2)} GB`],
			});
		}
		const uniqueLanguages = Array.from(
			new Set(movie.files[0].subtitles.map((subtitle) => subtitle.language)),
		);
		movieFacts.push({
			key: 'Subtitles',
			values: uniqueLanguages[0] ? uniqueLanguages : ['None'],
		});
	}

	return movieFacts;
}

export function createSeriesFacts(series: Series) {
	const seriesFacts: MediaFact[] = [];

	if (series.metadata.status) {
		seriesFacts.push({ key: 'Status', values: [series.metadata.status] });
	}

	if (series.metadata.firstAirDate) {
		seriesFacts.push({
			key: 'First Air Date',
			values: [formatReleaseDate(series.metadata.firstAirDate)],
		});
	}

	if (series.metadata.lastAirDate) {
		seriesFacts.push({
			key: 'Last Air Date',
			values: [formatReleaseDate(series.metadata.lastAirDate)],
		});
	}

	seriesFacts.push({
		key: 'Request Status',
		values: series.info ? [MediaStatus[series.info?.requestStatus]] : ['Unrequested'],
	});

	return seriesFacts;
}
