'use server';

import {
	getMovieDetails,
	getRatings,
	getRecommendations,
	getSimilar,
	getFiles,
} from '@/app/actions';
import { MediaType } from '@/app/typess';
import { createMovieFacts, formatDuration } from '@/app/utils';
import MediaPage from '@/components/MediaPage';

export default async function MoviePage({ params }: { params: { id: string } }) {
	// const { data: movieDetails } = useSWR(`movie-${params.id}-details`, () =>
	// 	getMovieDetails(parseInt(params.id)),
	// );

	const movieDetails = await getMovieDetails(parseInt(params.id));

	// const { data: rottenTomatoesRating } = useSWR(`movie-${params.id}-rating`, () =>
	// 	getRatings(MediaType.MOVIE, parseInt(params.id)),
	// );

	const rottenTomatoesRating = await getRatings(MediaType.MOVIE, parseInt(params.id));

	// const { data: files } = useSWR(`movie-${params.id}-files`, () =>
	// 	movieDetails?.mediaInfo?.ratingKey
	// 		? getFiles(parseInt(movieDetails.mediaInfo.ratingKey))
	// 		: null,
	// );

	const files = null;

	// const { data: recommendedMovies } = useSWR(`movie-${params.id}-recommendations`, () =>
	// 	getRecommendations(MediaType.MOVIE, parseInt(params.id)),
	// );

	const recommendedMovies = await getRecommendations(MediaType.MOVIE, parseInt(params.id));

	// const { data: similarMovies } = useSWR(`movie-${params.id}-similar`, () =>
	// 	getSimilar(MediaType.MOVIE, parseInt(params.id)),
	// );

	const similarMovies = await getSimilar(MediaType.MOVIE, parseInt(params.id));

	if (movieDetails) {
		return (
			<MediaPage
				id={movieDetails.id}
				mediaType={MediaType.MOVIE}
				backdropPath={movieDetails.backdropPath}
				posterPath={movieDetails.posterPath}
				title={movieDetails.title}
				attributes={[
					movieDetails.releases.results
						.find((release) => release.iso_3166_1 === 'US') // Find US release
						?.release_dates?.filter((release) => release.certification) // Filter out releases without certification
						.reduce((prev, current) => (prev.release_date < current.release_date ? prev : current))
						.certification || null,
					movieDetails.releaseDate.split('-')[0],
					formatDuration(movieDetails.runtime),
				]}
				requestStatus={movieDetails.mediaInfo?.status}
				trailerUrl={movieDetails.relatedVideos.find((video) => video.type === 'Trailer')?.url}
				iOSPlexUrl={movieDetails.mediaInfo?.iOSPlexUrl}
				tagline={movieDetails.tagline}
				overview={movieDetails.overview}
				collection={movieDetails.collection}
				rottenTomatoesRating={rottenTomatoesRating}
				mediaFacts={createMovieFacts(movieDetails, files)}
				cast={movieDetails.credits.cast}
				recommendations={recommendedMovies?.results}
				similar={similarMovies?.results}
			/>
		);
	}
}
