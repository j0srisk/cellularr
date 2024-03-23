'use client';

import { getGenreTv } from '@/app/actions';
import CompactNavigationBar from '@/components/Common/CompactNavigationBar';
import InfiniteResults from '@/components/Search/InfiniteResults';
import { genreNameMap } from '@/components/Search/constants';
import { useSearchParams } from 'next/navigation';

export default function DiscoverTvPage() {
	const searchParams = useSearchParams();

	const genre = searchParams.get('genre');

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<CompactNavigationBar title={genre ? genreNameMap[Number(genre)] : 'Discover'} />
			<div className="pt-nav-compact pb-nav-4">
				{genre && (
					<InfiniteResults
						fetcher={getGenreTv}
						query={genre}
						showFeatured={true}
						genreId={Number(genre)}
					/>
				)}
			</div>
		</div>
	);
}