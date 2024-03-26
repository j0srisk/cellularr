'use client';

import { getSearch } from '@/app/actions';
import NavigationBar from '@/components/Common/NavigationBar';
import SafetyBar from '@/components/Common/SafetyBar';
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
	const [isSearching, setIsSearching] = useState<boolean>(false);

	const router = useRouter();

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<div className="pt-safe bg-nav sticky top-0 z-30 flex w-full flex-col px-4">
				<div
					className={`flex w-full transform-gpu flex-col justify-end transition-all duration-300 ease-out ${
						isSearching ? 'h-[63px]' : 'h-[104px]'
					}`}
				>
					<div className="flex w-full flex-col items-center justify-center pb-[8px] pt-[3px]">
						{!isSearching && <p className="w-full truncate text-large-title-emphasized">Search</p>}
					</div>
					<div className="flex w-full items-center gap-2 pb-[15px] pt-[1px]">
						<SearchBar
							value={searchText}
							onChange={(e) => {
								const value = e.target.value;
								const encodedValue = encodeURIComponent(value);
								setSearchText(value);
								router.replace('/search?query=' + encodedValue);
							}}
							onFocus={() => setIsSearching(true)}
							clearFunction={() => {
								setSearchText('');
								router.replace('/search');
							}}
						/>
						{isSearching && (
							<div
								className="flex h-full cursor-pointer items-center justify-center"
								onClick={() => {
									setIsSearching(false);
									setSearchText('');
									router.replace('/search');
								}}
							>
								<p className="text-body text-system-blue-light dark:text-system-blue-dark">
									Cancel
								</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="pb-nav-4 flex h-fit w-full gap-4">
				{searchQuery && <InfiniteResults fetcher={getSearch} query={searchQuery} />}
				<Discover className={searchQuery ? 'hidden' : ''} />
			</div>
		</div>
	);
}
