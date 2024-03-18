import { MediaType, Session, File, Audio, Subtitle } from '@/app/types';
import overseerr from '@/services/overseerr/overseerr';
import { MediaFile } from '@/services/tautulli/interface';
import 'server-only';

async function command(cmd: string) {
	if (!process.env.TAUTULLI_URL || !process.env.TAUTULLI_API_KEY) {
		throw new Error('Tautulli API: Tautulli URL or API key not set');
	}

	const response = await fetch(
		process.env.TAUTULLI_URL + '/api/v2?apikey=' + process.env.TAUTULLI_API_KEY + '&cmd=' + cmd,
		{ cache: 'no-store' },
	);

	if (response.status !== 200) {
		const errorData = await response.json();
		throw new Error('Tautulli API: ' + errorData.response.message);
	}

	return await response.json();
}

const tautulli = {
	getSessions: async function () {
		const sessions = await command('get_activity');

		let activeSessions: Session[] = [];

		for (const tautulliSession of sessions.response.data.sessions) {
			const guid =
				tautulliSession.grandparent_guids.find((guid: string) => guid.startsWith('tmdb://')) ||
				tautulliSession.guids.find((guid: string) => guid.startsWith('tmdb://'));
			const tmdbId = guid?.substring('tmdb://'.length);

			let mediaType;

			switch (tautulliSession.media_type) {
				case 'episode':
					mediaType = MediaType.TV;
					break;
				case 'movie':
					mediaType = MediaType.MOVIE;
					break;
				case 'track':
					mediaType = MediaType.MUSIC;
					break;
				default:
					mediaType = MediaType.MOVIE;
			}

			const { city, region } = (await tautulli.getLocation(tautulliSession.ip_address)) || {
				city: null,
				region: null,
			};

			const overseerrMedia = await overseerr.getMedia(mediaType, parseInt(tmdbId));

			const session: Session = {
				id: tautulliSession.session_key,
				grandparentTitle: tautulliSession.grandparent_title,
				parentTitle: tautulliSession.parent_title,
				title: tautulliSession.title,
				mediaType: mediaType,
				transcodeProgress: tautulliSession.transcode_progress || null,
				progress: tautulliSession.progress_percent,
				user: tautulliSession.friendly_name,
				userThumb: tautulliSession.user_thumb,
				player: tautulliSession.player,
				year: tautulliSession.year,
				posterPath: overseerrMedia?.posterPath || null,
				backdropPath: overseerrMedia?.backdropPath || null,
				ratingKey: tautulliSession.rating_key,
				duration: tautulliSession.stream_duration,
				state: tautulliSession.state,
				tmdbId: parseInt(tmdbId),
				season: tautulliSession.parent_media_index,
				episode: tautulliSession.media_index,
				city: city || null,
				region: region || null,
			};

			activeSessions.push(session);
		}

		return activeSessions;
	},
	getFiles: async function (ratingKey: number) {
		const fileDetails = await command('get_metadata&rating_key=' + ratingKey).then(
			(res) => res.response.data,
		);

		const files: MediaFile[] = fileDetails.media_info;

		return files;
	},
	getFile: async function (ratingKey: number) {
		const fileDetails = await command('get_metadata&rating_key=' + ratingKey).then(
			(res) => res.response.data,
		);

		//returns null if file is not found or ratingKey is invalid
		if (Object.keys(fileDetails).length === 0) {
			return null;
		}

		const file: File = {
			resolution: fileDetails.media_info[0].video_full_resolution,
			videoCodec: fileDetails.media_info[0].video_codec,
			audioCodec: fileDetails.media_info[0].audio_codec,
			audioChannelLayout: fileDetails.media_info[0].audio_channel_layout,
			dynamicRange: fileDetails.media_info[0].parts[0].streams[0].video_dynamic_range,
			audios: [],
			subtitles: [],
		};

		fileDetails.media_info[0].parts[0].streams.forEach((stream: any) => {
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

		return file;
	},
	getLocation: async function (ipAddress: string) {
		const geolocationDetails = await command('get_geoip_lookup&ip_address=' + ipAddress);

		const city = geolocationDetails.response.data.city;

		const region = geolocationDetails.response.data.region;

		if (!city || city === 'Unknown') {
			return null;
		}

		return { city, region };
	},
};

export default tautulli;
