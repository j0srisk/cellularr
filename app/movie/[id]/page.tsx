'use client';

import { getMovie } from '@/app/actionss';
import {
	Movie,
	Cast,
	RelatedMediaMetadata,
	MediaDetail,
	MediaStatus,
	MediaType,
} from '@/app/typess';
import { CreateBackdropUrl, FormatDuration, CreatePosterUrl } from '@/app/utils';
import Carousel from '@/components/Carousel';
import MediaDetailsCard from '@/components/MediaDetailsCard';
import Request from '@/components/NewRequest';
import PersonCard from '@/components/PersonCard';
import PosterCard from '@/components/PosterCard';
import Poster from '@/components/PosterCard';
import Section from '@/components/Section';
import { CertificationBadge, RottenTomatoesCriticsRatingBadge } from '@/components/media/Badges';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const [movie, setMovie] = useState<Movie>();
	const [movieDetails, setMovieDetails] = useState<MediaDetail[]>([]);
	const [backdropHeight, setBackdropHeight] = useState(0);
	const [requestPanel, setRequestPanel] = useState(false);

	const router = useRouter();

	const divRef = useCallback((node: any) => {
		if (node !== null) {
			setBackdropHeight(node.offsetHeight);
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const currentPosition = window.scrollY;
			console.log('Scroll position:', currentPosition);
			setScrollPosition(currentPosition);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const currentPosition = event.currentTarget.scrollTop;
		console.log('Scroll position:', currentPosition);
		setScrollPosition(currentPosition);
	};

	useEffect(() => {
		async function fetchData() {
			const movie = await getMovie(parseInt(params.id));

			const movieDetails: MediaDetail[] = [
				{ key: 'Release Status', values: [movie.metadata.status] },
				{ key: 'Release Date', values: [movie.metadata.releaseDate] },
				...(movie.metadata.budget
					? [{ key: 'Budget', values: ['$' + movie.metadata.budget.toLocaleString()] }]
					: []),
				...(movie.metadata.revenue
					? [{ key: 'Revenue', values: ['$' + movie.metadata.revenue.toLocaleString()] }]
					: []),
			];

			if (movie.files) {
				movieDetails.push({
					key: 'Resolution',
					values: [movie.files[0].fullResolution],
				});
				movieDetails.push({
					key: 'File Size',
					values: [`${(movie.files[0].size / (1024 * 1024 * 1024)).toFixed(2)} GB`],
				});
				if (movie.files[0].subtitles.length > 0) {
					movieDetails.push({
						key: 'Subtitles',
						values: movie.files[0].subtitles.map((subtitle) => subtitle.language),
					});
				}
			}

			{
				/*
			if (movie.metadata.budget)
				movieDetails.push({
					key: 'Budget',
					values: ['$' + movie.metadata.budget.toLocaleString()],
				});
			if (movie.metadata.revenue)
				movieDetails.push({
					key: 'Revenue',
					values: ['$' + movie.metadata.revenue.toLocaleString()],
				});
			*/
			}

			setMovie(movie);
			setMovieDetails(movieDetails);
		}
		fetchData();
	}, [params.id]);

	if (!movie) {
		return null;
	}

	return (
		<div className="pb-nav no-scrollbar flex h-full w-full animate-fade flex-col overflow-auto">
			<div className="relative flex h-fit w-full flex-shrink-0 bg-gradient-to-b from-transparent to-system-primary-light dark:to-system-primary-dark">
				<div ref={divRef} className="pt-safe h-fit w-full">
					<div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
						<Poster
							title={movie.metadata.title}
							year={movie.metadata.releaseDate.split('-')[0]}
							imageURL={CreatePosterUrl(movie.metadata.posterPath)}
							className="z-10 w-2/5 max-w-[300px] border-none"
						/>

						<p className="text-center text-large-title-emphasized leading-[34px]">
							{movie.metadata.title}
						</p>
						<div className="flex items-center gap-2 text-label-secondary-light dark:text-label-secondary-dark">
							<CertificationBadge
								certification={
									movie.metadata.releases
										.find((release) => release.iso_3166_1 === 'US')
										?.release_dates.find((date) => date.type === 3 && date.certification)
										?.certification ||
									movie.metadata.releases
										.find((release) => release.iso_3166_1 === 'US')
										?.release_dates.find((date) => date.certification)?.certification
								}
							/>
							<p className="text-subheadline-emphasized">•</p>
							<p className="text-subheadline">{movie.metadata.releaseDate.split('-')[0]}</p>
							<p className="text-subheadline-emphasized">•</p>
							<p className="text-subheadline">{FormatDuration(movie.metadata.runtime)}</p>
						</div>
						<div className="flex w-full items-center justify-center gap-2">
							{movie.info?.iOSPlexUrl && (
								<Link
									href={movie.info.iOSPlexUrl}
									className="flex w-1/2 items-center justify-center gap-2 rounded-lg border border-system-orange-dark bg-system-orange-light/80 p-3 shadow-sm"
								>
									<p className="text-subheadline-emphasized">Play on Plex</p>
									<svg
										className="h-4 w-4 fill-current stroke-current"
										viewBox="0 0 32 32"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M15.527 0h-9.287l10.239 16-10.239 16h9.287l10.233-16-10.233-16z" />
									</svg>
								</Link>
							)}
							{!movie.info && (
								<>
									<button
										className="flex w-1/2 items-center justify-center gap-2 rounded-lg border border-system-indigo-dark bg-system-indigo-light p-3 shadow-sm"
										onClick={() => setRequestPanel(true)}
									>
										<p className="text-subheadline-emphasized">Request</p>
									</button>
									{requestPanel && (
										<Request
											movie={movie}
											closeFunction={() => setRequestPanel(false)}
											backdropHeight={backdropHeight}
										/>
									)}
								</>
							)}
							<Link
								href="/"
								className="flex h-full items-center justify-center gap-2 rounded-lg border border-fill-tetiary-light bg-fill-tetiary-light p-3 shadow-sm dark:border-fill-tetiary-dark dark:bg-fill-tetiary-dark"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-5 w-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6 bg-system-primary-light dark:bg-system-primary-dark">
				{movie.metadata.tagline && (
					<Section>
						<p className="px-4 text-large-title italic text-label-secondary-light dark:text-label-secondary-dark">
							{movie.metadata.tagline}
						</p>
					</Section>
				)}
				{movie.metadata.overview && (
					<Section heading="Overview">
						<p className="px-4 text-body">{movie.metadata.overview}</p>
					</Section>
				)}
				<Section className="px-4">
					<MediaDetailsCard ratings={movie.ratings} details={movieDetails} />
				</Section>
				<Section heading="Cast">
					<Carousel className="px-4">
						{movie.metadata.cast.map((cast: Cast) => (
							<PersonCard
								key={cast.id}
								name={cast.name}
								character={cast.character}
								imageURL={CreatePosterUrl(cast.profilePath)}
								className="w-32"
							/>
						))}
					</Carousel>
				</Section>
				{movie.recommendations && (
					<Section heading="Recommended Films">
						<Carousel className="px-4">
							{movie.recommendations.map((metadata: RelatedMediaMetadata) => (
								<PosterCard
									key={metadata.id}
									title={metadata.title}
									year={metadata.releaseDate.split('-')[0]}
									imageURL={CreatePosterUrl(metadata.posterPath)}
									className="w-32"
									onClick={() => router.replace('/' + metadata.mediaType + '/' + metadata.id)}
								/>
							))}
						</Carousel>
					</Section>
				)}

				<Section heading="Similar Films">
					<Carousel className="px-4">
						{movie.similar.map((metadata: RelatedMediaMetadata) => (
							<PosterCard
								key={metadata.id}
								title={metadata.title}
								year={metadata.releaseDate.split('-')[0]}
								imageURL={CreatePosterUrl(metadata.posterPath)}
								className="w-32"
								onClick={() => router.replace('/' + metadata.mediaType + '/' + metadata.id)}
							/>
						))}
					</Carousel>
				</Section>
			</div>
			<div
				className="fixed -z-10 w-full bg-cover bg-center blur-sm"
				style={{
					backgroundImage: `url(${CreateBackdropUrl(movie.metadata.backdropPath)}`,
					height: backdropHeight,
				}}
			/>
		</div>
	);
}
