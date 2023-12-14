import { MovieDetails, MediaStatus, MediaType, Cast, FileMetadata, Rating } from '@/app/types';
import {
	CreatePosterUrl,
	CreateBackdropUrl,
	FormatDuration,
	FormatReleaseDate,
	GetRatingImageUrl,
} from '@/app/utils';
import CastMember from '@/components/CastMember';
import CastSection from '@/components/CastSection';
import Divider from '@/components/Divider';
import MediaCardCompact from '@/components/MediaCardCompact';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import {
	ContentRatingBadge,
	ResolutionBadge,
	RottenTomatoesBadge,
} from '@/components/MetadataBadges';
import OverviewSection from '@/components/OverviewSection';
import PlayButton from '@/components/PlayButton';
import ProcessingButton from '@/components/ProcessingButton';
import RelatedMediaSection from '@/components/RelatedMediaSection';
import RequestButton from '@/components/RequestButton';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import ScrollTrackingBackdrop from '@/components/ScrollTrackingBackdrop';
import SnapCarousel from '@/components/SnapCarousel';
import VideosSection from '@/components/VideosSection';
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

	console.log(movieDetails.releaseDate);

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
							{movieDetails.genres[0] && (
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
								<div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-5 w-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>

									<p className="font-bold">Request Pending</p>
								</div>
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PROCESSING && (
								<ProcessingButton media={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PARTIALLY_AVAILABLE && (
								<PlayButton mediaDetails={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE && (
								<PlayButton mediaDetails={movieDetails} />
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-col bg-black pb-24">
					<OverviewSection mediaDetails={movieDetails} />
					<Divider />
					<VideosSection mediaDetails={movieDetails} />
					<Divider />
					<RelatedMediaSection mediaDetails={movieDetails} />
					<Divider />
					<CastSection mediaDetails={movieDetails} />

					<Divider />
					<MediaDetailsSection heading={'Information'}>
						<div className="flex flex-col px-4">
							<p className="text-xs font-medium text-white">Production Company</p>
							<p className="text-off-white text-xs font-medium">
								{movieDetails.productionCompanies[0] ? (
									<>{movieDetails.productionCompanies[0].name}</>
								) : (
									<>Unknown</>
								)}
							</p>
						</div>
						<div className="flex flex-col px-4">
							<p className="text-xs font-medium text-white">Release Date</p>
							<p className="text-off-white text-xs font-medium">
								{movieDetails.releaseDate ? (
									<>{FormatReleaseDate(movieDetails.releaseDate)}</>
								) : (
									<>Unknown</>
								)}
							</p>
						</div>
						<div className="flex flex-col px-4">
							<p className="text-xs font-medium text-white">Runtime</p>
							<p className="text-off-white text-xs font-medium">
								{movieDetails.runtime ? <>{FormatDuration(movieDetails.runtime)}</> : <>Unknown</>}
							</p>
						</div>
						<div className="flex flex-col px-4">
							<p className="text-xs font-medium text-white">Budget</p>
							<p className="text-off-white text-xs font-medium">
								{movieDetails.budget ? <>${movieDetails.budget?.toLocaleString()}</> : <>Unknown</>}
							</p>
						</div>
						<div className="flex flex-col px-4">
							<p className="text-xs font-medium text-white">Revenue</p>
							<p className="text-off-white text-xs font-medium">
								{movieDetails.revenue ? (
									<>${movieDetails.revenue?.toLocaleString()}</>
								) : (
									<>Unknown</>
								)}
							</p>
						</div>
					</MediaDetailsSection>
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
