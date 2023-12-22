import { MovieDetails, MediaType, MediaStatus, Subtitle, Audio, Cast } from '@/app/types';
import {
	CreateBackdropUrl,
	FormatDuration,
	FormatReleaseDate,
	GetMediaDetails,
	GetRecommendedMedia,
	GetSimilarMedia,
} from '@/app/utils';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import BadgeRow from '@/components/media/BadgeRow';
import CastMember from '@/components/media/CastMember';
import Hero from '@/components/media/Hero';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Header from '@/components/media/sections/Header';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';

export default async function Page({ params }: { params: { id: string } }) {
	//gets movieDetails from overseerr based on the id in the url
	const movieDetails: MovieDetails = await GetMediaDetails(MediaType.MOVIE, params.id);

	//set the mediaType to movie because MovieDetails doesn't return a mediaType property
	movieDetails.mediaType = MediaType.MOVIE;

	//gets recommended media from overseerr
	const recommendedMedia = await GetRecommendedMedia(movieDetails.mediaType, movieDetails.id);

	//gets similar media from overseerr
	const similarMedia = await GetSimilarMedia(movieDetails.mediaType, movieDetails.id);

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
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)}>
				<Hero
					title={movieDetails.title}
					metadataDetailsArray={movieDetailsArray}
					overview={movieDetails.overview}
					id={movieDetails.id}
					mediaType={movieDetails.mediaType}
					contentRating={'PG'}
				>
					<Button className="bg-white text-system-primary-dark" text="Play" />
				</Hero>

				<div className="pb-nav flex flex-col gap-3 bg-system-primary-light py-3 dark:bg-system-primary-dark">
					{movieDetails.relatedVideos[0] && (
						<SectionTemplate heading={'Videos'}>
							<SnapCarousel>
								{movieDetails.relatedVideos?.map((video) => (
									<MediaCardSmall
										key={video.name}
										title={video.name}
										detailsArray={[video.type]}
										imageUrl={'http://i3.ytimg.com/vi/' + video.key + '/hqdefault.jpg'}
										className="w-[calc(66%)]"
										href={video.url}
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{similarMedia[0] && (
						<SectionTemplate heading={'Similar'}>
							<SnapCarousel>
								{similarMedia.map((media: MovieDetails) => (
									<MediaCardSmall
										key={media.id}
										title={media.title}
										detailsArray={[media.releaseDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										href={'/movie/' + media.id}
										className="w-[calc(50%-6px)]"
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{recommendedMedia[0] && (
						<SectionTemplate heading={'Recommended'}>
							<SnapCarousel>
								{recommendedMedia.map((media: MovieDetails) => (
									<MediaCardSmall
										key={media.id}
										title={media.title}
										detailsArray={[media.releaseDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										href={'/movie/' + media.id}
										className="w-[calc(50%-6px)]"
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{movieDetails.credits.cast[0] && (
						<SectionTemplate heading={'Cast'}>
							<SnapCarousel>
								{movieDetails.credits?.cast.map((cast: Cast) => (
									<CastMember key={cast.id} cast={cast} />
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{movieDetails.collection && (
						<SectionTemplate heading={'Collection'}>
							<SnapCarousel>
								<MediaCardSmall
									key={movieDetails.collection.id}
									title={movieDetails.collection.name}
									imageUrl={CreateBackdropUrl(movieDetails.collection.backdropPath)}
									href={'/collection/' + movieDetails.collection.id}
									className="w-[calc(66%)]"
								/>
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					<SectionTemplate heading={'Information'}>
						<InformationItem
							title={'Production Company'}
							value={
								movieDetails.productionCompanies[0] ? (
									<>{movieDetails.productionCompanies[0].name}</>
								) : (
									<>Unknown</>
								)
							}
						/>
						<InformationItem
							title={'Release Date'}
							value={
								movieDetails.releaseDate ? (
									<>{FormatReleaseDate(movieDetails.releaseDate)}</>
								) : (
									<>Unknown</>
								)
							}
						/>
						<InformationItem
							title={'Run Time'}
							value={
								movieDetails.runtime ? <>{FormatDuration(movieDetails.runtime)}</> : <>Unknown</>
							}
						/>
						<InformationItem
							title={'Budget'}
							value={
								movieDetails.budget ? <>${movieDetails.budget?.toLocaleString()}</> : <>Unknown</>
							}
						/>
						<InformationItem
							title={'Revenue'}
							value={
								movieDetails.revenue ? <>${movieDetails.revenue?.toLocaleString()}</> : <>Unknown</>
							}
						/>
					</SectionTemplate>
					{movieDetails.tatutulliMetadata && (
						<SectionTemplate heading={'Languages'}>
							<InformationItem
								title={'Audio'}
								value={
									Array.from(
										new Set(movieDetails.tatutulliMetadata.audios.map((audio) => audio.language)),
									).join(', ') || 'None'
								}
							/>

							<InformationItem
								title={'Subtitles'}
								value={
									Array.from(
										new Set(
											movieDetails.tatutulliMetadata.subtitles.map((subtitle) => subtitle.language),
										),
									).join(', ') || 'None'
								}
							/>
						</SectionTemplate>
					)}
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
