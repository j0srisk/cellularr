import { MovieDetails, MediaStatus, MediaType, Cast, FileMetadata } from '@/app/types';
import { CreatePosterUrl, CreateBackdropUrl, FormatDuration } from '@/app/utils';
import CastMember from '@/components/CastMember';
import Divider from '@/components/Divider';
import MediaCardCompact from '@/components/MediaCardCompact';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import ProcessingButton from '@/components/ProcessingButton';
import RequestButton from '@/components/RequestButton';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import ScrollTrackingBackdrop from '@/components/ScrollTrackingBackdrop';
import type { Viewport } from 'next';
import Link from 'next/link';

export const viewport: Viewport = {
	viewportFit: 'cover',
};

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerrproxy/movie/' + id, {
		cache: 'no-cache',
	});

	const movieDetails: MovieDetails = await overseerrResponse.json();

	//set the mediaType to movie because MovieDetails doesn't return a mediaType
	movieDetails.mediaType = MediaType.MOVIE;

	//set the formattedReleaseDate to a readable format
	if (movieDetails.releaseDate) {
		const releaseDate = new Date(movieDetails.releaseDate);
		const formattedDate = releaseDate.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});

		movieDetails.formattedReleaseDate = formattedDate;
	}

	//get recommended media from overseerr
	const recommendedMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + id + '/recommendations',
	);

	const { results: recommendedMedia } = await recommendedMediaResponse.json();

	//get file metadata from tautulli if downloaded
	let fileMetadata: FileMetadata | undefined;

	if (movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE) {
		const tautulliResponse = await fetch(
			'http://localhost:3000/api/tautulliproxy?cmd=get_metadata&rating_key=' +
				movieDetails.mediaInfo?.ratingKey,
		);

		const {
			response: { data: tautulliData },
		} = await tautulliResponse.json();

		fileMetadata = {
			ratingKey: tautulliData.rating_key,
			mediaType: tautulliData.media_type,
			resolution: tautulliData.media_info[0].video_full_resolution,
			videoCodec: tautulliData.media_info[0].video_codec,
			audioCodec: tautulliData.media_info[0].audio_codec,
			audioChannelLayout: tautulliData.media_info[0].audio_channel_layout,
			contentRating: tautulliData.content_rating,
		};
	}

	console.log(movieDetails.relatedVideos);

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)}>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="flex h-fit w-full flex-col items-center justify-center gap-4 bg-gradient-to-t from-black  to-transparent pb-8 pt-20">
						<p className="px-2 text-center text-3xl font-black">{movieDetails.title}</p>
						<div className="flex w-2/3 flex-col gap-2">
							<div className="flex w-full items-center justify-center gap-1 text-xs font-black text-neutral-400">
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
									className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-5 w-5"
									>
										<path
											fillRule="evenodd"
											d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
											clipRule="evenodd"
										/>
									</svg>

									<p className="text-lg font-black">Play on Plex</p>
								</Link>
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE && (
								<Link
									href={
										movieDetails.mediaInfo.iOSPlexUrl
											? movieDetails.mediaInfo.iOSPlexUrl
											: 'https://app.plex.tv'
									}
									className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="h-5 w-5"
									>
										<path
											fillRule="evenodd"
											d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
											clipRule="evenodd"
										/>
									</svg>

									<p className="text-lg font-black">Play on Plex</p>
								</Link>
							)}
						</div>
					</div>
				</div>

				<div className="mb-2 flex flex-col gap-2 bg-black">
					<MediaDetailsSection>
						<p className="px-4 text-sm font-black text-white">{movieDetails.overview}</p>
						{fileMetadata && (
							<div className="no-scrollbar flex w-full gap-2 overflow-x-scroll px-4">
								<p className="h-fit w-fit rounded-sm border-2 border-neutral-400 px-1 text-xs font-black uppercase leading-[.8rem] text-neutral-400">
									{fileMetadata.contentRating}
								</p>
								<p className="h-fit w-fit rounded-sm border-2 border-neutral-400 bg-neutral-400 px-1 text-xs font-bold uppercase leading-[.8rem] text-black">
									{fileMetadata.resolution}
								</p>
								<p className="h-fit w-fit flex-shrink-0 rounded-sm border-2 border-neutral-400 px-1 text-xs font-black uppercase leading-[.8rem] text-neutral-400">
									{fileMetadata.videoCodec}
								</p>
								<p className="h-fit w-fit flex-shrink-0 rounded-sm border-2 border-neutral-400 px-1 text-xs font-black uppercase leading-[.8rem] text-neutral-400">
									{fileMetadata.audioCodec}
								</p>
								<p className="h-fit w-fit flex-shrink-0 rounded-sm border-2 border-neutral-400 px-1 text-xs font-black uppercase leading-[.8rem] text-neutral-400">
									{fileMetadata.audioChannelLayout}
								</p>
							</div>
						)}
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Videos'}>
						<div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
							{movieDetails.relatedVideos?.map((video) => (
								<Link
									href={video.url}
									className="flex w-48 flex-shrink-0 flex-col gap-1"
									key={video.key}
								>
									<img
										src={'http://i3.ytimg.com/vi/' + video.key + '/hqdefault.jpg'}
										alt="trailer"
										className="aspect-video rounded-lg object-cover object-center"
									/>
									<div className="flex flex-col">
										<p className="w-full truncate text-sm font-black text-white">{video.name}</p>
										<p className="w-full truncate text-xs font-black text-neutral-400">
											{video.type}
										</p>
									</div>
								</Link>
							))}
						</div>
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Related'}>
						<div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
							{recommendedMedia.map((media: MovieDetails) => (
								<MediaCardCompact media={media} key={media.id} />
							))}
						</div>
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Cast'}>
						<div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
							{movieDetails.credits?.cast.map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</div>
					</MediaDetailsSection>
					<Divider />
					<MediaDetailsSection heading={'Information'}>
						{movieDetails.productionCompanies && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Production Company</p>
								<p className="text-xs font-black text-neutral-400">
									{movieDetails.productionCompanies[0].name}
								</p>
							</div>
						)}
						{movieDetails.formattedReleaseDate && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Release Date</p>
								<p className="text-xs font-black text-neutral-400">
									{movieDetails.formattedReleaseDate}
								</p>
							</div>
						)}
						{movieDetails.runtime !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Runtime</p>
								<p className="text-xs font-black text-neutral-400">
									{FormatDuration(movieDetails.runtime)}
								</p>
							</div>
						)}
						{movieDetails.budget !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Budget</p>
								<p className="text-xs font-black text-neutral-400">
									${movieDetails.budget?.toLocaleString()}
								</p>
							</div>
						)}
						{movieDetails.revenue !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Revenue</p>
								<p className="text-xs font-black text-neutral-400">
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
