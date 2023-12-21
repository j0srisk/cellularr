import { MediaType, Session } from '@/app/types';

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
		next: { revalidate: 10 },
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

export async function GetMediaDetails(mediaType: MediaType, id: string) {
	const mediaDetailsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/' + mediaType + '/' + id,
	);

	const mediaDetails = await mediaDetailsResponse.json();

	return mediaDetails;
}

export async function GetSeason(tvId: number, seasonId: number) {
	const tvDetailsResponse = await GetMediaDetails(MediaType.TV, tvId.toString());

	{
		/*
	if (tvDetailsResponse.mediaInfo.ratingKey) {
		const tautulliResponse = await fetch(
			'http://localhost:3000/api/tautulliproxy?cmd=get_children_metadata&rating_key=' +
				tvDetailsResponse.mediaInfo.ratingKey,
		);

		const tautulliResponseJson = await tautulliResponse.json();

		const tatutulliSeasons = tautulliResponseJson.response.data.children_list;

		let tautulliSeason = tatutulliSeasons.find((season: any) => {
			return season.media_index.toString() === seasonId.toString();
		});

		console.log(tautulliSeason);
	}
	*/
	}

	console.log(seasonId);

	const seasonResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/tv/' + tvId + '/season/' + seasonId,
	);

	const season = await seasonResponse.json();

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
