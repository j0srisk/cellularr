'use client';

import RequestButton from '../RequestButton';
import { MediaType, MediaFact } from '@/app/types';
import { backdropUrl } from '@/app/types';
import Button from '@/components/Common/Button';
import Poster from '@/components/Common/PosterCard';
import Section from '@/components/Common/Section';
import SystemBackground from '@/components/Common/SystemBackground';
import MediaAttributes from '@/components/MediaPage/Attributes';
import Backdrop from '@/components/MediaPage/Backdrop';
import CollectionCard from '@/components/MediaPage/CollectionCard';
import MediaFacts from '@/components/MediaPage/FactsCard';
import MediaSlider from '@/components/MediaPage/Slider';
import Request from '@/components/Request';
import useBackdropScale from '@/hooks/useBackdropScale';
import { Collection } from '@/services/overseerr/types/collection';
import { MediaStatus } from '@/services/overseerr/types/common';
import { Cast, Rating } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { MovieResult, TvResult, PersonResult } from '@/services/overseerr/types/search';
import { TvDetails } from '@/services/overseerr/types/tv';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type MediaPageProps = {
	id: number;
	mediaType: MediaType.MOVIE | MediaType.TV | MediaType.COLLECTION;
	mediaDetails: MovieDetails | TvDetails | Collection;
	backdropPath: string | null;
	posterPath: string | null;
	title: string;
	attributes: (string | null)[];
	requestStatus?: MediaStatus;
	trailerUrl?: string;
	iOSPlexUrl?: string;
	tagline?: string | null;
	overview: string | null;
	collection?: Collection;
	rottenTomatoesRating?: Rating | null;
	mediaFacts?: MediaFact[];
	cast?: Cast[] | null;
	recommendations?: (MovieResult | TvResult | PersonResult)[];
	similar?: (MovieResult | TvResult | PersonResult)[];
	movies?: MovieResult[];
};

export default function MediaPage(props: MediaPageProps) {
	const { backdropHeight, scaleFactor, handleScroll, setRef } = useBackdropScale(0);
	const [backdropBlurred, setBackdropBlurred] = useState(true);

	const [requestPanelOpen, setRequestPanelOpen] = useState(false);

	const router = useRouter();

	return (
		<div
			className="pb-nav no-scrollbar flex h-screen w-screen animate-fade flex-col overflow-auto"
			onScroll={handleScroll}
		>
			<div
				id="movie-hero"
				ref={setRef}
				className="flex w-full flex-col items-center gap-6 bg-gradient-to-b from-transparent to-system-primary-light px-4 pb-8 pt-32 dark:to-system-primary-dark"
			>
				<Poster
					id={props.id}
					mediaType={props.mediaType}
					title={props.title}
					posterPath={props.posterPath}
					className={`z-10 w-32 rounded-lg border-none ${
						backdropBlurred ? 'opacity-100' : 'opacity-0'
					}`}
					onClick={() => setBackdropBlurred(!backdropBlurred)}
				/>

				<div className="flex w-full flex-col items-center justify-center gap-2">
					<p className="text-center text-large-title-emphasized leading-[28px]">{props.title}</p>
					<MediaAttributes attributes={props.attributes} />
					<div className="flex w-full items-center justify-center gap-2">
						<RequestButton
							requestStatus={props.requestStatus}
							iOSPlexUrl={props.iOSPlexUrl}
							setRequestPanelOpen={setRequestPanelOpen}
						/>
						{props.trailerUrl && (
							<SystemBackground className="rounded-lg">
								<Button
									onClick={() => router.push(props.trailerUrl!)}
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
				{props.tagline && (
					<Section>
						<p className="px-4 text-title-2 italic text-label-secondary-light dark:text-label-secondary-dark">
							{props.tagline}
						</p>
					</Section>
				)}
				{props.overview && (
					<Section heading="Overview">
						<p className="px-4 text-body text-label-secondary-light dark:text-label-secondary-dark">
							{props.overview}
						</p>
					</Section>
				)}
				{props.collection && (
					<Section className="px-4">
						<CollectionCard collection={props.collection} />
					</Section>
				)}
				{props.mediaFacts && (
					<Section className="px-4">
						<MediaFacts
							ratings={{ rottenTomatoes: props.rottenTomatoesRating }}
							facts={props.mediaFacts}
						/>
					</Section>
				)}
				{props.cast && props.cast.length > 0 && (
					<Section heading="Cast">
						<MediaSlider results={props.cast} />
					</Section>
				)}
				{props.recommendations && props.recommendations.length > 0 && (
					<Section
						heading={'Recommended ' + (props.mediaType === MediaType.MOVIE ? 'Films' : 'Series')}
					>
						<MediaSlider results={props.recommendations} />
					</Section>
				)}
				{props.similar && (
					<>
						{props.similar.length > 0 && (
							<Section
								heading={'Similar ' + (props.mediaType === MediaType.MOVIE ? 'Films' : 'Series')}
							>
								<MediaSlider results={props.similar} />
							</Section>
						)}
					</>
				)}
				{props.movies && (
					<>
						{props.movies.length > 0 && (
							<Section heading="Films">
								<MediaSlider results={props.movies} />
							</Section>
						)}
					</>
				)}
			</div>

			<>
				<Backdrop
					backdropUrl={backdropUrl + props.backdropPath}
					backdropHeight={backdropHeight}
					scaleFactor={scaleFactor}
					blurred={backdropBlurred}
				/>
				{requestPanelOpen && (
					<Request
						mediaType={MediaType.MOVIE}
						id={props.id}
						title={props.title}
						mediaDetails={props.mediaDetails}
						backdropUrl={backdropUrl + props.backdropPath}
						backdropHeight={backdropHeight}
						closeFunction={() => setRequestPanelOpen(false)}
					/>
				)}
			</>
		</div>
	);
}
