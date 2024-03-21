'use client';

import { getTrending, getSearch } from '@/app/actions';
import CompactNavBar from '@/components/Common/CompactNavBar';
import InfiniteResults from '@/components/Discover/InfiniteResults';

export default function DiscoverTrendingPage() {
	return (
		<div className="w-full bg-system-primary-light dark:bg-system-primary-dark">
			<CompactNavBar title="Trending" />
			<InfiniteResults fetcher={getTrending} query={'trending'} />
		</div>
	);
}
