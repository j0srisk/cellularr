import {
	getMovieDetails,
	getRatings,
	getRecommendations,
	getSimilar,
	getFiles,
} from '@/app/actions';
import { MediaType } from '@/app/types';
import { createMovieFacts, formatDuration } from '@/app/utils';
import MediaPage from '@/components/MediaPage/Page';

export default async function MoviePage({ params }: { params: { id: string } }) {
	const movieDetails = await getMovieDetails(parseInt(params.id));

	const rottenTomatoesRating = await getRatings(MediaType.MOVIE, parseInt(params.id));

	const recommendedMovies = await getRecommendations(MediaType.MOVIE, parseInt(params.id));

	const similarMovies = await getSimilar(MediaType.MOVIE, parseInt(params.id));

	let files = null;
	if (movieDetails?.mediaInfo?.ratingKey) {
		files = await getFiles(movieDetails.mediaInfo.ratingKey);
	}

	// let certification = null;

	// const usReleases = movieDetails.releases.results.find((release) => release.iso_3166_1 === 'US');

	// const releasesWithCertification = usReleases?.release_dates.filter(
	// 	(release) => release.certification,
	// );

	// const theaterRelease = releasesWithCertification?.find(
	// 	(release) => release.type === 3 && release.certification,
	// );

	// if (!theaterRelease) {
	// 	const anyRelease = releasesWithCertification?.find((release) => release.certification);

	// 	certification = anyRelease?.certification;
	// } else {
	// 	certification = theaterRelease.certification;
	// }

	let certification = (
		movieDetails.releases.results
			.find((release) => release.iso_3166_1 === 'US')
			?.release_dates.find((release) => release.type === 3) ||
		movieDetails.releases.results
			.find((release) => release.iso_3166_1 === 'US')
			?.release_dates.find((release) => release.certification)
	)?.certification;

	if (movieDetails) {
		return (
			<MediaPage
				id={movieDetails.id}
				mediaType={MediaType.MOVIE}
				backdropPath={movieDetails.backdropPath}
				posterPath={movieDetails.posterPath}
				title={movieDetails.title}
				attributes={[
					certification ? certification : 'NR',
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
