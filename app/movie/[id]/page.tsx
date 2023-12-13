import { MovieDetails, MediaStatus, MediaType, Cast } from '@/app/types';
import { CreatePosterUrl, CreateBackdropUrl, FormatDuration } from '@/app/utils';
import CastMember from '@/components/CastMember';
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

	if (movieDetails.releaseDate) {
		const releaseDate = new Date(movieDetails.releaseDate);
		const formattedDate = releaseDate.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});

		movieDetails.formattedReleaseDate = formattedDate;
	}

	const recommendedMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + id + '/recommendations',
	);

	const { results: recommendedMedia } = await recommendedMediaResponse.json();

	console.log(movieDetails.mediaInfo?.status);

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)}>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="z-10 flex h-fit w-full flex-col items-center justify-center gap-1 bg-gradient-to-t from-black  to-transparent pb-8 pt-20">
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
				<div className="flex flex-col gap-4 bg-black">
					<MediaDetailsSection>
						<p className="px-4 text-sm font-black text-white">{movieDetails.overview}</p>
					</MediaDetailsSection>
					<MediaDetailsSection heading={'Related'}>
						<div className="flex gap-3 overflow-x-auto px-4">
							{recommendedMedia.map((media: MovieDetails) => (
								<MediaCardCompact media={media} key={media.id} />
							))}
						</div>
					</MediaDetailsSection>
					<MediaDetailsSection heading={'Cast'}>
						<div className="flex gap-3 overflow-x-auto px-4">
							{movieDetails.credits?.cast.map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</div>
					</MediaDetailsSection>
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
