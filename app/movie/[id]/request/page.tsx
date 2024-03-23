import { getMovieDetails } from '@/app/actions';
import { MediaType } from '@/app/types';
import RequestPage from '@/components/Request/Page';

export default async function RequestMoviePage({ params }: { params: { id: string } }) {
	const movieDetails = await getMovieDetails(parseInt(params.id));

	return <RequestPage mediaType={MediaType.MOVIE} mediaDetails={movieDetails} />;
}
