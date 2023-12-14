import { MovieDetails, MediaStatus, MediaType, Cast, FileMetadata, Rating } from '@/app/types';
import {
	CreatePosterUrl,
	CreateBackdropUrl,
	FormatDuration,
	FormatReleaseDate,
	GetRatingImageUrl,
} from '@/app/utils';
import CastMember from '@/components/CastMember';
import Divider from '@/components/Divider';
import MediaCardCompact from '@/components/MediaCardCompact';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import {
	ContentRatingBadge,
	ResolutionBadge,
	RottenTomatoesBadge,
} from '@/components/MetadataBadges';
import ProcessingButton from '@/components/ProcessingButton';
import RequestButton from '@/components/RequestButton';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import ScrollTrackingBackdrop from '@/components/ScrollTrackingBackdrop';
import SnapCarousel from '@/components/SnapCarousel';
import type { Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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

	//gets rotten tomatoes ratings from overseerr
	const ratingsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + id + '/ratings',
	);

	movieDetails.rating = await ratingsResponse.json();

	//gets file metadata from tautulli if the media is available on plex
	if (movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE) {
		const tautulliResponse = await fetch(
			'http://localhost:3000/api/tautulliproxy?cmd=get_metadata&rating_key=' +
				movieDetails.mediaInfo?.ratingKey,
		);

		const {
			response: { data: tautulliData },
		} = await tautulliResponse.json();

		const mediaMetadata = {
			ratingKey: tautulliData.rating_key,
			mediaType: tautulliData.media_type,
			resolution: tautulliData.media_info[0].video_full_resolution,
			videoCodec: tautulliData.media_info[0].video_codec,
			audioCodec: tautulliData.media_info[0].audio_codec,
			audioChannelLayout: tautulliData.media_info[0].audio_channel_layout,
			contentRating: tautulliData.content_rating,
		};

		movieDetails.mediaMetadata = mediaMetadata;
	}

	//get related media from overseerr
	const recommendedMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + id + '/recommendations',
	);

	const { results: recommendedMedia } = await recommendedMediaResponse.json();

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)}>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="flex h-fit w-full flex-col items-center justify-center bg-gradient-to-t from-black to-transparent px-3 pb-3 pt-20">
						{/* Title */}
						<p className="pb-1 text-center text-3xl font-bold text-white/95">
							{movieDetails.title}
						</p>
						{/* Media Info */}
						<div
							className="text-off-white
							 mb-3 flex w-full items-center justify-center gap-1 text-xs font-semibold"
						>
							{movieDetails.genres && (
								<>
									<p>{movieDetails.genres[0].name}</p>
								</>
							)}

							{movieDetails.releaseDate && (
								<>
									<p>•</p>
									<p>{movieDetails.releaseDate?.split('-')[0]}</p>
								</>
							)}

							{movieDetails.runtime !== 0 && (
								<>
									<p>•</p>
									<>{FormatDuration(movieDetails.runtime)}</>
								</>
							)}
						</div>
						{/* Play / Request Button */}
						<div className="flex w-full flex-col items-center px-6">
							{!movieDetails.mediaInfo && <RequestButton media={movieDetails} />}
							{movieDetails.mediaInfo?.status === MediaStatus.UNKNOWN && (
								<RequestButton media={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PENDING && (
								<div className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={3}
										stroke="currentColor"
										className="h-5 w-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>

									<p className="text-lg font-black">Request Pending</p>
								</div>
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PROCESSING && (
								<ProcessingButton media={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PARTIALLY_AVAILABLE && (
								<Link
									href={
										movieDetails.mediaInfo.iOSPlexUrl
											? movieDetails.mediaInfo.iOSPlexUrl
											: 'https://app.plex.tv'
									}
									className="flex h-9 w-56 items-center justify-center gap-2 rounded-md bg-white text-black"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="hidden h-5 w-5"
									>
										<path
											fillRule="evenodd"
											d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
											clipRule="evenodd"
										/>
									</svg>

									<p className="font-semibold">Watch on Plex</p>
								</Link>
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE && (
								<Link
									href={
										movieDetails.mediaInfo.iOSPlexUrl
											? movieDetails.mediaInfo.iOSPlexUrl
											: 'https://app.plex.tv'
									}
									className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="hidden h-5 w-5"
									>
										<path
											fillRule="evenodd"
											d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
											clipRule="evenodd"
										/>
									</svg>

									<p className="font-semibold">Watch on Plex</p>
								</Link>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col bg-black">
					<MediaDetailsSection>
						<p className="mb-3 px-4 text-sm font-normal text-white/95">{movieDetails.overview}</p>
						{movieDetails.mediaMetadata || movieDetails.rating ? (
							<div className="no-scrollbar text-off-white mb-3 flex w-full items-center gap-[5px] overflow-x-scroll px-4">
								{movieDetails.rating && (
									<div className="flex items-center gap-1">
										<RottenTomatoesBadge criticsRating={movieDetails.rating.criticsRating} />
										<p className="h-fit w-fit rounded-sm text-xs font-medium uppercase">
											{movieDetails.rating.criticsScore ? (
												<>{movieDetails.rating.criticsScore}%</>
											) : (
												<>--</>
											)}
										</p>
									</div>
								)}
								{movieDetails.mediaMetadata && (
									<>
										<ContentRatingBadge contentRating={movieDetails.mediaMetadata.contentRating} />
										<ResolutionBadge resolution={movieDetails.mediaMetadata.resolution} />
									</>
								)}
							</div>
						) : null}
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Videos'}>
						<SnapCarousel>
							{movieDetails.relatedVideos?.map((video) => (
								<MediaCardCompact
									key={video.key}
									title={video.name}
									subtitle={video.type}
									imageUrl={'http://i3.ytimg.com/vi/' + video.key + '/hqdefault.jpg'}
									url={video.url}
								/>
							))}
						</SnapCarousel>
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Related'}>
						<SnapCarousel>
							{recommendedMedia.map((media: MovieDetails) => (
								<MediaCardCompact
									key={media.id}
									title={media.title}
									subtitle={media.releaseDate?.split('-')[0]}
									imageUrl={CreateBackdropUrl(media.backdropPath)}
									url={'/movie/' + media.id}
								/>
							))}
						</SnapCarousel>
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Cast'}>
						<SnapCarousel>
							{movieDetails.credits?.cast.map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</SnapCarousel>
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Information'}>
						{movieDetails.productionCompanies && (
							<>
								{movieDetails.productionCompanies[0] && (
									<div className="flex flex-col px-4">
										<p className="text-xs font-medium text-white">Production Company</p>
										<p className="text-off-white text-xs font-medium">
											{movieDetails.productionCompanies[0].name}
										</p>
									</div>
								)}
							</>
						)}
						{movieDetails.releaseDate && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-medium text-white">Release Date</p>
								<p className="text-off-white text-xs font-medium">
									{FormatReleaseDate(movieDetails.releaseDate)}
								</p>
							</div>
						)}
						{movieDetails.runtime !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-medium text-white">Runtime</p>
								<p className="text-off-white text-xs font-medium">
									{FormatDuration(movieDetails.runtime)}
								</p>
							</div>
						)}
						{movieDetails.budget !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-medium text-white">Budget</p>
								<p className="text-off-white text-xs font-medium">
									${movieDetails.budget?.toLocaleString()}
								</p>
							</div>
						)}
						{movieDetails.revenue !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-medium text-white">Revenue</p>
								<p className="text-off-white text-xs font-medium">
									${movieDetails.revenue?.toLocaleString()}
								</p>
							</div>
						)}
					</MediaDetailsSection>
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
