import { getTvDetails, getRatings, getRecommendations, getSimilar } from '@/app/actions';
import { MediaType } from '@/app/types';
import { createTvFacts } from '@/app/utils';
import MediaPage from '@/components/MediaPage/Page';

export default async function TvPage({ params }: { params: { id: string } }) {
	const tvDetails = await getTvDetails(parseInt(params.id));

	const rottenTomatoesRating = await getRatings(MediaType.TV, parseInt(params.id));

	const recommendedSeries = await getRecommendations(MediaType.TV, parseInt(params.id));

	const similarSeries = await getSimilar(MediaType.TV, parseInt(params.id));

	if (tvDetails) {
		return (
			<MediaPage
				id={tvDetails.id}
				mediaType={MediaType.TV}
				mediaDetails={tvDetails}
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
