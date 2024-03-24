'use client';

import { MediaType, MediaFact } from '@/app/types';
import Section from '@/components/Common/Section';
import { useTransition } from '@/components/Common/TransitionRoot';
import CollectionCard from '@/components/MediaPage/CollectionCard';
import MediaFacts from '@/components/MediaPage/FactsCard';
import MediaHero from '@/components/MediaPage/Hero';
import MediaSlider from '@/components/MediaPage/Slider';
import useBackdropScale from '@/hooks/useBackdropScale';
import { Collection } from '@/services/overseerr/types/collection';
import { MediaStatus } from '@/services/overseerr/types/common';
import { Cast, Rating } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { MovieResult, TvResult, PersonResult } from '@/services/overseerr/types/search';
import { TvDetails } from '@/services/overseerr/types/tv';
import { useState, useEffect } from 'react';

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
	const [backdroploaded, setBackdropLoaded] = useState(!props.backdropPath);

	return (
		<>
			<div
				className={`pb-nav no-scrollbar flex h-screen w-screen flex-col overflow-auto opacity-0 ${
					backdroploaded ? 'animate-fade opacity-100' : ''
				}`}
				onScroll={handleScroll}
			>
				<MediaHero
					{...props}
					backdropHeight={backdropHeight}
					scaleFactor={scaleFactor}
					setRef={setRef}
					setBackdropLoaded={setBackdropLoaded}
				/>

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
			</div>
		</>
	);
}
