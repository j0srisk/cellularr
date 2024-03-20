import { getMovieGenres, getSeriesGenres } from '@/app/actions';
import { MediaType } from '@/app/typess';
import Genres from '@/components/Discover/Genres';
import useSWR from 'swr';

export default function SeriesGenres({}) {
	const { data: seriesGenres } = useSWR('seriesGenres', getSeriesGenres);

	if (seriesGenres) {
		return <Genres genres={seriesGenres} mediaType={MediaType.TV} />;
	}
}
