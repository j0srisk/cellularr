'use client';

import { getGenreMovies } from '@/app/actions';
import CompactNavBar from '@/components/Common/CompactNavBar';
import InfiniteResults from '@/components/Discover/InfiniteResults';
import { useSearchParams } from 'next/navigation';

export default function DiscoverMoviesPage() {
	const searchParams = useSearchParams();

	const genre = searchParams.get('genre');

	return (
		<div className="w-full bg-system-primary-light dark:bg-system-primary-dark">
			<CompactNavBar title="Trending" />
			{genre && <InfiniteResults fetcher={getGenreMovies} query={genre} />}
		</div>
	);
}
