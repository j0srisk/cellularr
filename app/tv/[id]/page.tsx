'use client';

import { getSeries } from '@/app/actionss';
import { Series, Cast, RelatedMediaMetadata, MediaDetail, MediaStatus } from '@/app/typess';
import { CreateBackdropUrl, FormatDuration, CreatePosterUrl } from '@/app/utils';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import MediaDetailsCard from '@/components/MediaDetailsCard';
import PersonCard from '@/components/PersonCard';
import PosterCard from '@/components/PosterCard';
import Poster from '@/components/PosterCard';
import Section from '@/components/Section';
import { CertificationBadge, RottenTomatoesCriticsRatingBadge } from '@/components/media/Badges';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const [series, setSeries] = useState<Series>();
	const [seriesDetails, setSeriesDetails] = useState<MediaDetail[]>([]);
	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const series = await getSeries(parseInt(params.id));

			const seriesDetails: MediaDetail[] = [
				{ key: 'Status', values: [series.metadata.status] },
				{ key: 'Series Type', values: [series.metadata.type] },
				{ key: 'First Episode', values: [series.metadata.firstAirDate] },
				{ key: 'Lastest Episode', values: [series.metadata.lastAirDate] },
				{ key: 'Network', values: series.metadata.networks.map((network) => network.name) },
			];

			setSeries(series);
			setSeriesDetails(seriesDetails);
		}
		fetchData();
	}, [params.id]);

	if (!series) {
		return null;
	}

	return (
		<div className="pb-nav no-scrollbar flex h-full w-full animate-fade flex-col overflow-auto">
			<div className="relative flex w-full flex-shrink-0 bg-gradient-to-b from-transparent to-system-primary-light dark:to-system-primary-dark">
				<div className="pt-safe w-full">
					<div className="flex flex-col items-center justify-center gap-2 px-4 py-8">
						<Poster
							title={series.metadata.name}
							year={series.metadata.firstAirDate.split('-')[0]}
							imageURL={CreatePosterUrl(series.metadata.posterPath)}
							className="z-10 w-2/5 max-w-[300px] border-none"
						/>

						<p className="text-center text-large-title-emphasized leading-[34px]">
							{series.metadata.name}
						</p>
						<div className="flex items-center gap-2 text-label-secondary-light dark:text-label-secondary-dark">
							<p className="text-subheadline">{series.metadata.firstAirDate.split('-')[0]}</p>
						</div>
						{series.info?.iOSPlexUrl && (
							<Link
								href={series.info.iOSPlexUrl}
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
						{!series.info && (
							<button className="flex w-1/2 items-center justify-center gap-2 rounded-lg border border-system-indigo-dark bg-system-indigo-light/80 p-3 shadow-sm">
								<p className="text-subheadline-emphasized">Request</p>
							</button>
						)}
					</div>
				</div>
				<div
					className="absolute -z-10 h-full w-full bg-blue-500 bg-cover bg-center blur"
					style={{ backgroundImage: `url(${CreateBackdropUrl(series.metadata.backdropPath)})` }}
				/>
			</div>
			<div className="flex flex-col gap-6 bg-system-primary-light dark:bg-system-primary-dark">
				{series.metadata.tagline && (
					<Section>
						<p className="px-4 text-large-title italic text-label-secondary-light dark:text-label-secondary-dark">
							{series.metadata.tagline}
						</p>
					</Section>
				)}
				{series.metadata.overview && (
					<Section heading="Overview">
						<p className="px-4 text-body">{series.metadata.overview}</p>
					</Section>
				)}
				<Section className="px-4">
					<MediaDetailsCard ratings={series.ratings} details={seriesDetails} />
				</Section>
				<Section heading="Seasons">
					<div className="flex flex-col gap-2 px-4">
						{series.seasons.map((season) => (
							<Card
								key={season.id}
								className="w-full flex-row items-center justify-between p-2 py-4"
							>
								<p className="text-subheadline-emphasized">{season.name}</p>

								<p className="text-right text-subheadline text-label-secondary-light dark:text-label-secondary-dark">
									{season.episodeCount} episodes
								</p>
							</Card>
						))}
					</div>
				</Section>
				<Section heading="Cast">
					<Carousel className="px-4">
						{series.metadata.cast.map((cast: Cast) => (
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
				{series.recommendations && (
					<Section heading="Recommended Series">
						<Carousel className="px-4">
							{series.recommendations.map((metadata: RelatedMediaMetadata) => (
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
				{series.similar && (
					<Section heading="Similar Series">
						<Carousel className="px-4">
							{series.similar.map((metadata: RelatedMediaMetadata) => (
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
			</div>
		</div>
	);
}
