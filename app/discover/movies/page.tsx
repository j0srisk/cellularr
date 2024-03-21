'use client';

import { getGenreMovies } from '@/app/actions';
import CompactNavigationBar from '@/components/Common/CompactNavigationBar';
import InfiniteResults from '@/components/Discover/InfiniteResults';
import { useSearchParams } from 'next/navigation';

export default function DiscoverMoviesPage() {
	const searchParams = useSearchParams();

	const genre = searchParams.get('genre');

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<CompactNavigationBar title="{Genre Name}" />
			<div className="pt-nav-compact pb-nav-4 px-4">
				<InfiniteResults fetcher={getGenreMovies} query={genre} showFeatured={true} />
			</div>
		</div>
	);
}
