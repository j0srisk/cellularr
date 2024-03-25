import { MediaFact } from '@/app/types';
import { MediaStatus } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { TvDetails } from '@/services/overseerr/types/tv';
import { MediaFile } from '@/services/tautulli/types/media';
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

export function formatDuration(durationInMinutes: number | null) {
	if (durationInMinutes === null) {
		return null;
	}

	if (durationInMinutes === Infinity) {
		return '∞ mins';
	}

	if (durationInMinutes < 1) {
		return '< 1 min';
	}

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

export function formatDurationSeconds(durationInSeconds: number) {
	if (durationInSeconds === Infinity) {
		return '∞ secs';
	}

	if (durationInSeconds < 1) {
		return '< 1 sec';
	}

	const hours = Math.floor(durationInSeconds / 3600);
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = durationInSeconds % 60;

	let hourString = hours === 1 ? ' hr' : ' hrs';
	let minuteString = minutes === 1 ? ' min' : ' mins';
	let secondString = seconds === 1 ? ' sec' : ' secs';

	if (hours === 0) {
		if (minutes === 0) {
			return seconds + secondString;
		}
		return minutes + minuteString + ' ' + seconds + secondString;
	} else if (minutes === 0) {
		return hours + hourString + ' ' + seconds + secondString;
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

export function createMovieFacts(movieDetails: MovieDetails, files?: MediaFile[] | null) {
	const movieFacts: MediaFact[] = [];

	if (movieDetails.status) {
		movieFacts.push({ key: 'Release Status', values: [movieDetails.status] });
	}

	if (movieDetails.releaseDate) {
		movieFacts.push({
			key: 'Release Date',
			values: [formatReleaseDate(movieDetails.releaseDate)],
		});
	}

	if (movieDetails.originalLanguage) {
		const language = ISO6391.getName(movieDetails.originalLanguage);
		if (language) {
			movieFacts.push({ key: 'Original Language', values: [language] });
		}
	}

	if (movieDetails.budget) {
		movieFacts.push({ key: 'Budget', values: ['$' + movieDetails.budget.toLocaleString()] });
	}

	if (movieDetails.revenue) {
		movieFacts.push({
			key: 'Revenue',
			values: ['$' + movieDetails.revenue.toLocaleString()],
		});
	}

	movieFacts.push({
		key: 'Request Status',
		values: movieDetails.mediaInfo
			? [
					MediaStatus[movieDetails.mediaInfo?.status]
						.toString()
						.toLowerCase()
						.split('_')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' '),
				]
			: ['Unrequested'],
	});

	if (files) {
		if (files[0].video_full_resolution) {
			movieFacts.push({ key: 'Resolution', values: [files[0].video_full_resolution] });
		}
		if (files[0].parts[0].file_size) {
			movieFacts.push({
				key: 'File Size',
				values: [`${(files[0].parts[0].file_size / (1024 * 1024 * 1024)).toFixed(2)} GB`],
			});
		}
		const uniqueLanguages = Array.from(
			new Set(files[0].parts[0].streams.map((stream) => stream.subtitle_language)),
		).filter((lang) => lang !== undefined) as string[];
		movieFacts.push({
			key: 'Subtitles',
			values: uniqueLanguages.length > 0 ? uniqueLanguages : ['None'],
		});
	}

	return movieFacts;
}

export function createTvFacts(tvDetails: TvDetails) {
	const seriesFacts: MediaFact[] = [];

	if (tvDetails.status) {
		seriesFacts.push({ key: 'Status', values: [tvDetails.status] });
	}

	if (tvDetails.firstAirDate) {
		seriesFacts.push({
			key: 'First Air Date',
			values: [formatReleaseDate(tvDetails.firstAirDate)],
		});
	}

	if (tvDetails.lastAirDate) {
		seriesFacts.push({
			key: 'Last Air Date',
			values: [formatReleaseDate(tvDetails.lastAirDate)],
		});
	}

	seriesFacts.push({
		key: 'Request Status',
		values: tvDetails.mediaInfo
			? [
					MediaStatus[tvDetails.mediaInfo?.status]
						.toString()
						.toLowerCase()
						.split('_')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' '),
				]
			: ['Unrequested'],
	});

	return seriesFacts;
}
