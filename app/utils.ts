import {
	MediaType,
	MovieDetails,
	MediaStatus,
	Audio,
	Subtitle,
	Movie,
	File,
	Session,
	Collection,
	Season,
	Series,
	Download,
} from '@/app/types';

export const fetcher = (...args: any[]) =>
	fetch(...args, { method: 'GET', cache: 'no-store' }).then((res) => res.json());

export function CreatePosterUrl(posterPath: String | null) {
	if (posterPath === null || posterPath === undefined) {
		return;
	}
	return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + posterPath;
}

export function CreateBackdropUrl(backdropPath: String | null) {
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

export async function GetSessions() {
	const sessionsResponse = await fetch('http://localhost:3000/api/tautulliproxy?cmd=get_activity', {
		cache: 'no-store',
	});

	const sessions = await sessionsResponse.json();

	let activeSessions: Session[] = [];

	sessions.response.data.sessions.forEach((tautulliSession: any) => {
		const guid =
			tautulliSession.grandparent_guids.find((guid: string) => guid.startsWith('tmdb://')) ||
			tautulliSession.guids.find((guid: string) => guid.startsWith('tmdb://'));
		const text = guid.substring('tmdb://'.length);
		const session: Session = {
			id: tautulliSession.session_key,
			title: tautulliSession.grandparent_title || tautulliSession.title,
			mediaType: tautulliSession.media_type === 'episode' ? 'tv' : tautulliSession.media_type,
			progress: tautulliSession.progress_percent,
			user: tautulliSession.friendly_name,
			userThumb: tautulliSession.user_thumb,
			player: tautulliSession.player,
			year: tautulliSession.year,
			posterPath: tautulliSession.thumb,
			backdropPath: tautulliSession.art,
			ratingKey: tautulliSession.rating_key,
			duration: tautulliSession.stream_duration,
			state: tautulliSession.state,
			tmdbId: text,
			season: tautulliSession.parent_media_index,
			episode: tautulliSession.media_index,
		};
		activeSessions.push(session);
	});

	return activeSessions;
}

export async function GetMediaDetails(mediaType: MediaType, id: number) {
	const mediaDetailsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/' + mediaType + '/' + id,
		{ cache: 'no-store' },
	);

	const mediaDetails = await mediaDetailsResponse.json();

	return mediaDetails;
}

export async function GetMovie(id: number) {
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerrproxy/movie/' + id);

	const overseerrData = await overseerrResponse.json();

	//set the mediaType to movie because MovieDetails doesn't return a mediaType property

	const movie: Movie = {
		id: overseerrData.id,
		title: overseerrData.title,
		overview: overseerrData.overview,
		releaseDate: overseerrData.releaseDate,
		posterPath: overseerrData.posterPath,
		backdropPath: overseerrData.backdropPath,
		relatedVideos: overseerrData.relatedVideos,
		runtime: overseerrData.runtime,
		budget: overseerrData.budget,
		revenue: overseerrData.revenue,
		rating: overseerrData.rating,
		mediaType: MediaType.MOVIE,
		collection: null,
		genre: overseerrData.genres[0]?.name || null,
		cast: overseerrData.credits.cast,
		productionCompany: overseerrData.productionCompanies[0]?.name || null,
		contentRating:
			overseerrData.releases.results
				.find((release: any) => release.iso_3166_1 === 'US')
				?.release_dates.find((date: any) => date.certification !== '')?.certification || 'NR',
		requestStatus: overseerrData.mediaInfo?.status || MediaStatus.UNKNOWN,
		ratingKey: overseerrData.mediaInfo?.ratingKey || null,
		plexUrl: overseerrData.mediaInfo?.plexUrl || null,
		iOSPlexUrl: overseerrData.mediaInfo?.iOSPlexUrl || null,
		file: null,
	};

	if (overseerrData.collection) {
		movie.collection = {
			id: overseerrData.collection.id,
			name: overseerrData.collection.name,
			overview: overseerrData.collection.overview,
			posterPath: overseerrData.collection.posterPath,
			backdropPath: overseerrData.collection.backdropPath,
			movies: overseerrData.collection.parts,
			mediaType: MediaType.COLLECTION,
		};
	}

	if (movie.requestStatus === MediaStatus.AVAILABLE && movie.ratingKey) {
		const tautulliResponse = await fetch(
			'http://localhost:3000/api/tautulliproxy?cmd=get_metadata&rating_key=' + movie.ratingKey,
		);

		const tautulliData = (await tautulliResponse.json()).response.data;

		const file: File = {
			resolution: tautulliData.media_info[0].video_full_resolution,
			videoCodec: tautulliData.media_info[0].video_codec,
			audioCodec: tautulliData.media_info[0].audio_codec,
			audioChannelLayout: tautulliData.media_info[0].audio_channel_layout,
			dynamicRange: tautulliData.media_info[0].parts[0].streams[0].video_dynamic_range,
			audios: [],
			subtitles: [],
		};

		tautulliData.media_info[0].parts[0].streams.forEach((stream: any) => {
			if (stream.type === '2') {
				const audio: Audio = {
					id: stream.id,
					language: stream.audio_language,
					languageCode: stream.audio_language_code,
				};

				file.audios.push(audio);
			} else if (stream.type === '3') {
				const subtitle: Subtitle = {
					id: stream.id,
					language: stream.subtitle_language,
					languageCode: stream.subtitle_language_code,
				};

				file.subtitles.push(subtitle);
			}
		});

		movie.file = file;
	}

	return movie;
}

export async function GetCollection(id: number) {
	const overseerrResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/collection/' + id,
		{ cache: 'no-store' },
	);

	const overseerrData = await overseerrResponse.json();

	const collection: Collection = {
		id: overseerrData.id,
		name: overseerrData.name,
		overview: overseerrData.overview,
		posterPath: overseerrData.posterPath,
		backdropPath: overseerrData.backdropPath,
		movies: overseerrData.parts,
		mediaType: MediaType.COLLECTION,
	};

	return collection;
}

export async function GetSeries(id: number) {
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerrproxy/tv/' + id, {
		cache: 'no-store',
	});

	const overseerrData = await overseerrResponse.json();

	const series: Series = {
		mediaType: MediaType.TV,
		id: overseerrData.id,
		backdropPath: overseerrData.backdropPath,
		posterPath: overseerrData.posterPath,
		genre: overseerrData.genres[0]?.name || null,
		overview: overseerrData.overview,
		firstAirDate: overseerrData.firstAirDate,
		lastAirDate: overseerrData.lastAirDate || null,
		name: overseerrData.name,
		episodeRunTime: overseerrData.episodeRunTime[0],
		numberOfSeasons: overseerrData.numberOfSeasons,
		numberOfEpisodes: overseerrData.numberOfEpisodes,
		cast: overseerrData.credits.cast,
		requestStatus: overseerrData.mediaInfo?.status || MediaStatus.UNKNOWN,
		seasons: overseerrData.seasons,
		network: overseerrData.networks[0]?.name || null,
		status: overseerrData.status,
		contentRating:
			overseerrData.contentRatings.results.find(
				(contentRating: any) => contentRating.iso_3166_1 === 'US',
			).rating || 'NR',

		downloads:
			overseerrData.mediaInfo?.downloadStatus.map((download: Download) => ({
				id: download.id,
				estimatedCompletionTime: download.estimatedCompletionTime,
				status: download.status,
				size: download.size,
				sizeLeft: download.sizeLeft,
				episode: download.episode,
			})) || null,

		ratingKey: overseerrData.mediaInfo?.ratingKey || null,
		plexUrl: overseerrData.mediaInfo?.plexUrl || null,
		iOSPlexUrl: overseerrData.mediaInfo?.iOSPlexUrl || null,
	};

	return series;
}

export async function GetSeason(tvId: number, seasonId: number) {
	const overseerrResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/tv/' + tvId + '/season/' + seasonId,
		{ cache: 'no-store' },
	);

	const overseerrData = await overseerrResponse.json();

	if (overseerrData.episodes === undefined) {
		return;
	}

	const season: Season = {
		id: overseerrData.id,
		airDate: overseerrData.airDate,
		episodeCount: overseerrData.episodeCount,
		name: overseerrData.name,
		overview: overseerrData.overview,
		posterPath: overseerrData.posterPath,
		seasonNumber: overseerrData.seasonNumber,
		episodes: overseerrData.episodes,
		requestStatus: overseerrData.status,
	};

	return season;
}

export async function GetRecommendedMedia(mediaType: MediaType, mediaId: number) {
	const recommendedMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/' + mediaType + '/' + mediaId + '/recommendations',
	);

	const { results } = await recommendedMediaResponse.json();

	return results;
}

export async function GetSimilarMedia(mediaType: MediaType, mediaId: number) {
	const similarMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/' + mediaType + '/' + mediaId + '/similar',
	);

	const { results } = await similarMediaResponse.json();

	return results;
}

export async function GetRatings(mediaType: MediaType, mediaId: number) {
	const ratingsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/' + mediaType + '/' + mediaId + '/ratings',
	);

	const ratings = await ratingsResponse.json();

	return ratings;
}
