'use client';

import { getSeries } from '@/app/actionss';
import { createMovieFacts, createSeriesFacts } from '@/app/utils';
import MediaPage from '@/components/MediaPage';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const { data: series } = useSWR(`series-${params.id}`, () => getSeries(parseInt(params.id)));

	if (!series) {
		return null;
	}

	return (
		<MediaPage
			id={series.metadata.id}
			mediaType={series.mediaType}
			backdropPath={series.metadata.backdropPath}
			posterPath={series.metadata.posterPath}
			title={series.metadata.name}
			attributes={[series.metadata.certification, series.metadata.firstAirDate.split('-')[0]]}
			requestStatus={series.info?.requestStatus}
			trailerUrl={series.metadata.trailerUrl}
			iOSPlexUrl={series.info?.iOSPlexUrl}
			tagline={series.metadata.tagline}
			overview={series.metadata.overview}
			ratings={series.ratings}
			mediaFacts={createSeriesFacts(series)}
			cast={series.metadata.cast}
			recommendations={series.recommendations}
			similar={series.similar}
		/>
	);
}
