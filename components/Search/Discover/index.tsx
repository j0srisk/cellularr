import { getMovieGenres, getTvGenres, getTrending } from '@/app/actions';
import { MediaType } from '@/app/types';
import GenreCard from '@/components/Search/GenreCard';
import Genres from '@/components/Search/Genres';
import useSWR from 'swr';

export default function Discover() {
	const { data: trending, isLoading: trendingLoading } = useSWR(
		['trending', 1, 'en'],
		() => getTrending('trending', 1),
		{
			revalidateOnFocus: false,
		},
	);
	const { data: movieGenres, isLoading: moviesLoading } = useSWR('movieGenres', getMovieGenres, {
		revalidateOnFocus: false,
	});
	const { data: tvGenres, isLoading: tvLoading } = useSWR('seriesGenres', getTvGenres, {
		revalidateOnFocus: false,
	});

	if (!trendingLoading || !moviesLoading || !tvLoading) {
		return (
			<div className="flex w-full flex-col gap-3 px-4">
				{trending && trending.results[4].mediaType !== 'person' && (
					<>
						<p className="text-title-3-emphasized">Discover</p>
						<div className="grid grid-cols-2 gap-2">
							<GenreCard
								name="Trending"
								genreId={0}
								backdropPath={trending.results[4].backdropPath}
								href="/discover/trending"
							/>
						</div>
					</>
				)}
				{movieGenres && (
					<>
						<p className="text-title-3-emphasized">Movies</p>
						<Genres genres={movieGenres} mediaType={MediaType.MOVIE} />
					</>
				)}
				{tvGenres && (
					<>
						<p className="text-title-3-emphasized">TV Shows</p>
						<Genres genres={tvGenres} mediaType={MediaType.TV} />
					</>
				)}
			</div>
		);
	}
}
