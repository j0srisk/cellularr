'use client';

import { getMovie } from '@/app/actionss';
import { createMovieFacts, formatDuration } from '@/app/utils';
import MediaPage from '@/components/MediaPage';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const { data: movie } = useSWR(`movie-${params.id}`, () => getMovie(parseInt(params.id)));

	if (!movie) {
		return null;
	}

	return (
		<MediaPage
			id={movie.metadata.id}
			mediaType={movie.mediaType}
			backdropPath={movie.metadata.backdropPath}
			posterPath={movie.metadata.posterPath}
			title={movie.metadata.title}
			attributes={[
				movie.metadata.certification,
				movie.metadata.releaseDate.split('-')[0],
				formatDuration(movie.metadata.runtime),
			]}
			requestStatus={movie.info?.requestStatus}
			trailerUrl={movie.metadata.trailerUrl}
			iOSPlexUrl={movie.info?.iOSPlexUrl}
			tagline={movie.metadata.tagline}
			overview={movie.metadata.overview}
			collection={movie.metadata.collection}
			ratings={movie.ratings}
			mediaFacts={createMovieFacts(movie)}
			cast={movie.metadata.cast}
			recommendations={movie.recommendations}
			similar={movie.similar}
		/>
	);
}
