'use client';

import { getSearch } from '@/app/actions';
import Header from '@/components/Common/NavigationBar/Index';
import SearchBar from '@/components/Common/SearchBar';
import Discover from '@/components/Search/Discover';
import InfiniteResults from '@/components/Search/InfiniteResults';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query');

	const [searchText, setSearchText] = useState<string | ''>(searchQuery || '');

	const router = useRouter();

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<Header title="Search">
				<div className="w-full pb-[15px] pt-[1px]">
					<SearchBar
						value={searchText}
						onChange={(e) => {
							const value = e.target.value;
							const encodedValue = encodeURIComponent(value);
							setSearchText(value);
							router.replace('/search?query=' + encodedValue);
						}}
						clearFunction={() => {
							setSearchText('');
							router.replace('/search');
						}}
					/>
				</div>
			</Header>

			<div className="pb-nav-4 flex h-fit w-full gap-4">
				{searchQuery ? <InfiniteResults fetcher={getSearch} query={searchQuery} /> : <Discover />}
			</div>
		</div>
	);
}
