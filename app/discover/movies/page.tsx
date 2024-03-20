'use client';

import { getGenreMovies } from '@/app/actions';
import PosterGrid from '@/components/Discover/PosterGrid';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

export default function DiscoverMoviesPage() {
	const searchParams = useSearchParams();

	const genre = searchParams.get('genre');

	let results;

	if (genre) {
		const { data } = useSWR(`movie-genre-${genre}`, () => getGenreMovies(parseInt(genre)));

		if (data) {
			results = data;
		}
	}

	if (results) {
		return <PosterGrid results={results.results} />;
	}
}
