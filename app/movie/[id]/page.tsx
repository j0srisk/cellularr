import { MovieDetails, MediaType, MediaStatus, Subtitle, Audio } from '@/app/types';
import { CreateBackdropUrl, FormatDuration } from '@/app/utils';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import RequestButton from '@/components/media/RequestButton';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import Cast from '@/components/media/sections/Cast';
import Collection from '@/components/media/sections/Collection';
import Header from '@/components/media/sections/Header';
import Information from '@/components/media/sections/Information';
import Languages from '@/components/media/sections/Languages';
import Overview from '@/components/media/sections/Overview';
import RecommendedMedia from '@/components/media/sections/RecommendedMedia';
import SimilarMedia from '@/components/media/sections/SimilarMedia';
import Videos from '@/components/media/sections/Videos';
import type { Viewport } from 'next';

//sets the viewport to the entire screen so backdrop image surrounds notch or dynamic island
export const viewport: Viewport = {
	viewportFit: 'cover',
};

export default async function Page({ params }: { params: { id: string } }) {
	//gets tmdb movie id from the url
	const id = params.id;

	//gets movie details from overseerr
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerrproxy/movie/' + id, {
		cache: 'no-cache',
	});

	const movieDetails: MovieDetails = await overseerrResponse.json();

	//set the mediaType to movie because MovieDetails doesn't return a mediaType property
	movieDetails.mediaType = MediaType.MOVIE;

	//gets relevant metadata details for the header
	const movieDetailsArray = [];

	if (movieDetails.genres[0]) {
		movieDetailsArray.push(movieDetails.genres[0].name);
	}

	if (movieDetails.releaseDate) {
		movieDetailsArray.push(movieDetails.releaseDate.split('-')[0]);
	}

	if (movieDetails.runtime !== 0) {
		movieDetailsArray.push(FormatDuration(movieDetails.runtime));
	}

	//gets file metadata from tautulli if the media is available on plex
	if (movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE) {
		const tautulliResponse = await fetch(
			'http://localhost:3000/api/tautulliproxy?cmd=get_metadata&rating_key=' +
				movieDetails.mediaInfo?.ratingKey,
		);

		const {
			response: { data: tautulliData },
		} = await tautulliResponse.json();

		const tautulliMetadata = {
			ratingKey: tautulliData.rating_key,
			mediaType: tautulliData.media_type,
			resolution: tautulliData.media_info[0].video_full_resolution,
			videoCodec: tautulliData.media_info[0].video_codec,
			audioCodec: tautulliData.media_info[0].audio_codec,
			audioChannelLayout: tautulliData.media_info[0].audio_channel_layout,
			contentRating: tautulliData.content_rating,
			dynamicRange: tautulliData.media_info[0].parts[0].streams[0].video_dynamic_range,
			audios: [],
			subtitles: [],
		};

		movieDetails.tatutulliMetadata = tautulliMetadata;

		tautulliData.media_info[0].parts[0].streams.forEach((stream: any) => {
			if (stream.type === '2') {
				const audio: Audio = {
					id: stream.id,
					language: stream.audio_language,
					languageCode: stream.audio_language_code,
				};

				movieDetails.tatutulliMetadata.audios.push(audio);
			} else if (stream.type === '3') {
				const subtitle: Subtitle = {
					id: stream.id,
					language: stream.subtitle_language,
					languageCode: stream.subtitle_language_code,
				};

				movieDetails.tatutulliMetadata.subtitles.push(subtitle);
			}
		});
	}

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)}>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="flex h-fit w-full items-end bg-gradient-to-t from-black pt-20">
						<Header
							name={movieDetails.title}
							metadataDetailsArray={movieDetailsArray}
							button={<RequestButton media={movieDetails} />}
						/>
					</div>
				</div>
				<div className="flex flex-col bg-black pb-28">
					<Overview
						overview={movieDetails.overview}
						id={movieDetails.id}
						mediaType="movie"
						tatutulliMetadata={movieDetails.tatutulliMetadata}
					/>
					<Videos mediaDetails={movieDetails} />
					<SimilarMedia mediaDetails={movieDetails} />
					<RecommendedMedia mediaDetails={movieDetails} />
					<Cast mediaDetails={movieDetails} />
					<Collection collection={movieDetails.collection} />
					<Information mediaDetails={movieDetails} />
					<Languages mediaDetails={movieDetails} />
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
