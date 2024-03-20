'use client';

import { getMovie } from '@/app/actionss';
import { Cast, RelatedMediaMetadata, MediaType, UnitedStatesCertification } from '@/app/typess';
import {
	CreateBackdropUrl,
	FormatDuration,
	CreatePosterUrl,
	createMovieDetails,
} from '@/app/utils';
import Backdrop from '@/components/Backdrop';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import MediaDetailsCard from '@/components/MediaDetailsCard';
import Request from '@/components/NewRequest';
import PersonCard from '@/components/PersonCard';
import PosterCard from '@/components/PosterCard';
import Poster from '@/components/PosterCard';
import Section from '@/components/Section';
import SystemBackground from '@/components/SystemBackground';
import { CertificationBadge } from '@/components/media/Badges';
import useBackdropScale from '@/hooks/useBackdropScale';
import { useParams, useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import useSWR from 'swr';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const { data: movie } = useSWR(`movie-${params.id}`, () => getMovie(parseInt(params.id)));

	const [backdropHeight, setBackdropHeight] = useState(0);
	const [requestPanel, setRequestPanel] = useState(false);
	const [scaleFactor, setScaleFactor] = useState(1);

	const router = useRouter();

	const divRef = useCallback((node: any) => {
		if (node !== null) {
			setBackdropHeight(node.offsetHeight);
		}
	}, []);

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const currentPosition = event.currentTarget.scrollTop;
		if (currentPosition < 0) {
			const scaleFactor = 1 - currentPosition / backdropHeight;
			setScaleFactor(scaleFactor);
		}
	};

	if (!movie) {
		return null;
	}

	return (
		<div
			className="pb-nav no-scrollbar flex h-screen w-screen animate-fade flex-col overflow-auto"
			onScroll={handleScroll}
		>
			<div
				id="movie-hero"
				ref={divRef}
				className="flex w-full flex-col items-center gap-6 bg-gradient-to-b from-transparent to-system-primary-light px-4 pb-8 pt-32 dark:to-system-primary-dark"
			>
				<Poster
					title={movie.metadata.title}
					year={movie.metadata.releaseDate.split('-')[0]}
					imageURL={CreatePosterUrl(movie.metadata.posterPath)}
					className="z-10 w-32 rounded-lg border-none"
				/>

				<div className="flex w-full flex-col items-center justify-center gap-2">
					<p className="text-center text-large-title-emphasized leading-[28px]">
						{movie.metadata.title}
					</p>
					<div className="flex items-center justify-center gap-2 text-label-secondary-light dark:text-label-secondary-dark">
						{movie.metadata.certification in UnitedStatesCertification ? (
							<div className="mt-0.5 h-[15px] w-fit">
								<CertificationBadge certification={movie.metadata.certification} />
							</div>
						) : (
							<p className="text-subheadline">NR</p>
						)}
						<p className="text-subheadline-emphasized">•</p>
						<p className="text-subheadline">{movie.metadata.releaseDate.split('-')[0]}</p>
						<p className="text-subheadline-emphasized">•</p>
						<p className="text-subheadline">{FormatDuration(movie.metadata.runtime)}</p>
					</div>
					<div className="flex w-full items-center justify-center gap-2">
						{movie.info?.iOSPlexUrl && (
							<Button className="w-1/2 border border-system-orange-dark bg-system-orange-light dark:border-system-orange-dark dark:bg-system-orange-light">
								<p className="text-subheadline-emphasized">Play on Plex</p>
								<svg
									className="hidden h-4 w-4 fill-current stroke-current"
									viewBox="0 0 32 32"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M15.527 0h-9.287l10.239 16-10.239 16h9.287l10.233-16-10.233-16z" />
								</svg>
							</Button>
						)}
						{!movie.info && (
							<Button
								className="w-1/2 border border-system-indigo-dark bg-system-indigo-light dark:border-system-indigo-dark dark:bg-system-indigo-light"
								onClick={() => setRequestPanel(true)}
							>
								<p className="text-subheadline-emphasized">Request</p>
							</Button>
						)}
						{movie.metadata.trailerUrl && (
							<SystemBackground className="rounded-lg">
								<Button
									onClick={() => router.push(movie.metadata.trailerUrl)}
									className="flex h-full items-center justify-center rounded-lg p-2.5"
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
								</Button>
							</SystemBackground>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-6 bg-system-primary-light via-transparent pb-4 dark:bg-system-primary-dark">
				{movie.metadata.tagline && (
					<Section>
						<p className="text-title-2 px-4 italic text-label-secondary-light dark:text-label-secondary-dark">
							{movie.metadata.tagline}
						</p>
					</Section>
				)}
				{movie.metadata.overview && (
					<Section heading="Overview">
						<p className="px-4 text-body text-label-secondary-light dark:text-label-secondary-dark">
							{movie.metadata.overview}
						</p>
					</Section>
				)}
				{movie.metadata.collection && (
					<div className="w-full px-4">
						<Card className="">
							<div
								className="relative flex h-full bg-cover bg-center"
								style={{
									backgroundImage: `url(${CreateBackdropUrl(
										movie.metadata.collection.backdropPath,
									)})`,
								}}
							>
								<div className="flex w-full items-center justify-between gap-2 bg-gradient-to-b from-transparent to-system-primary-dark/75 p-4 dark:to-system-primary-dark/75">
									<p className="text-title-3 text-label-primary-dark">
										{movie.metadata.collection.name}
									</p>
									<SystemBackground className="rounded-lg">
										<Button
											onClick={() => router.push('/collection/' + movie.metadata.collection.id)}
										>
											<p className="text-subheadline-emphasized">View</p>
										</Button>
									</SystemBackground>
								</div>
							</div>
						</Card>
					</div>
				)}

				<Section className="px-4">
					<MediaDetailsCard ratings={movie.ratings} details={createMovieDetails(movie)} />
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
				{movie.recommendations.length > 0 && (
					<Section heading="Recommended Films">
						<Carousel className="px-4">
							{movie.recommendations.map((metadata: RelatedMediaMetadata) => (
								<PosterCard
									key={metadata.id}
									title={metadata.title}
									year={metadata.releaseDate.split('-')[0]}
									imageURL={CreatePosterUrl(metadata.posterPath)}
									className="w-32"
									onClick={() => router.push('/' + metadata.mediaType + '/' + metadata.id)}
								/>
							))}
						</Carousel>
					</Section>
				)}
				{movie.similar.length > 0 && (
					<Section heading="Similar Films">
						<Carousel className="px-4">
							{movie.similar.map((metadata: RelatedMediaMetadata) => (
								<PosterCard
									key={metadata.id}
									title={metadata.title}
									year={metadata.releaseDate.split('-')[0]}
									imageURL={CreatePosterUrl(metadata.posterPath)}
									className="w-32"
									onClick={() => router.push('/' + metadata.mediaType + '/' + metadata.id)}
								/>
							))}
						</Carousel>
					</Section>
				)}
			</div>

			<>
				<Backdrop
					backdropUrl={CreateBackdropUrl(movie.metadata.backdropPath)}
					backdropHeight={backdropHeight}
					scaleFactor={scaleFactor}
				/>
				{requestPanel && (
					<Request
						mediaType={MediaType.MOVIE}
						id={movie.metadata.id}
						title={movie.metadata.title}
						backdropUrl={CreateBackdropUrl(movie.metadata.backdropPath)}
						backdropHeight={backdropHeight}
						closeFunction={() => setRequestPanel(false)}
					/>
				)}
			</>
		</div>
	);
}
