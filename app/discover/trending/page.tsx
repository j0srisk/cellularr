'use client';

import { getTrending } from '@/app/actions';
import CompactNavigationBar from '@/components/Common/CompactNavigationBar';
import InfiniteResults from '@/components/Search/InfiniteResults';

export default function DiscoverTrendingPage() {
	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<CompactNavigationBar title="Trending" />
			<div className="pt-nav-compact pb-nav-4">
				<InfiniteResults fetcher={getTrending} query={'trending'} showFeatured={true} />
			</div>
		</div>
	);
}
