import { getMovieGenres } from '@/app/actions';
import { MediaType } from '@/app/typess';
import Genres from '@/components/Discover/Genres';
import useSWR from 'swr';

export default function MovieGenres({}) {
	const { data: movieGenres } = useSWR('movieGenres', getMovieGenres);

	if (movieGenres) {
		return <Genres genres={movieGenres} mediaType={MediaType.MOVIE} />;
	}
}
