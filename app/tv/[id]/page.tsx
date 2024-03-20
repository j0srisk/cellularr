'use client';

import { getTvDetails, getRatings, getRecommendations, getSimilar } from '@/app/actions';
import { MediaType } from '@/app/typess';
import { createTvFacts } from '@/app/utils';
import MediaPage from '@/components/MediaPage';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function TvPage() {
	const params = useParams<{ id: string }>();

	const { data: tvDetails } = useSWR(`tv-${params.id}-details`, () =>
		getTvDetails(parseInt(params.id)),
	);

	const { data: rottenTomatoesRating } = useSWR(`tv-${params.id}-rating`, () =>
		getRatings(MediaType.TV, parseInt(params.id)),
	);

	const { data: recommendedSeries } = useSWR(`tv-${params.id}-recommendations`, () =>
		getRecommendations(MediaType.TV, parseInt(params.id)),
	);

	const { data: similarSeries } = useSWR(`tv-${params.id}-similar`, () =>
		getSimilar(MediaType.TV, parseInt(params.id)),
	);

	if (tvDetails) {
		return (
			<MediaPage
				id={tvDetails.id}
				mediaType={MediaType.TV}
				backdropPath={tvDetails.backdropPath}
				posterPath={tvDetails.posterPath}
				title={tvDetails.name}
				attributes={[
					tvDetails.contentRatings.results.find((rating) => rating.iso_3166_1 === 'US')?.rating ||
						null,
					tvDetails.firstAirDate?.split('-')[0] || null,
					tvDetails.numberOfSeasons.toString() +
						' Season' +
						(tvDetails.numberOfSeasons > 1 ? 's' : ''),
				]}
				requestStatus={tvDetails.mediaInfo?.status}
				trailerUrl={tvDetails.relatedVideos.find((video) => video.type === 'Trailer')?.url}
				iOSPlexUrl={tvDetails.mediaInfo?.iOSPlexUrl}
				tagline={tvDetails.tagline}
				overview={tvDetails.overview}
				rottenTomatoesRating={rottenTomatoesRating}
				mediaFacts={createTvFacts(tvDetails)}
				cast={tvDetails.credits.cast}
				recommendations={recommendedSeries?.results}
				similar={similarSeries?.results}
			/>
		);
	}
}
