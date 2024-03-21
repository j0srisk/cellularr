'use client';

import { getGenreMovies } from '@/app/actions';
import PosterGrid from '@/components/Discover/PosterGrid';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

export default function DiscoverMoviesPage() {
	const searchParams = useSearchParams();

	const genre = searchParams.get('genre');

	const { data: genreResults } = useSWR(`genreMovies-${genre}`, () =>
		getGenreMovies(parseInt(genre ? genre : '')),
	);

	if (genreResults) {
		console.log(genreResults);
		return (
			<div>
				<p className="pb-4 text-title-1-emphasized">{genre}</p>
				<PosterGrid results={genreResults.results} />
			</div>
		);
	}
}
