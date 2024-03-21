'use client';

import { getSearch } from '@/app/actions';
import Header from '@/components/Common/NavigationBar/Index';
import GenreCard from '@/components/Discover/GenreCard';
import InfiniteResults from '@/components/Discover/InfiniteResults';
import MovieGenres from '@/components/Discover/MovieGenres';
import TrendingCard from '@/components/Discover/TrendingCard';
import TvGenres from '@/components/Discover/TvGenres';
import WatchlistCard from '@/components/Discover/WatchlistCard';
import SearchBar from '@/components/ui/SearchBar';
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
				{searchQuery ? (
					<InfiniteResults fetcher={getSearch} query={searchQuery} />
				) : (
					<div className="flex flex-col gap-3 px-4">
						<p className="text-title-3-emphasized">Discover</p>
						<div className="grid grid-cols-2 gap-2">
							<TrendingCard />
							<WatchlistCard />
						</div>
						<p className="text-title-3-emphasized">Movies</p>
						<MovieGenres />
						<p className="text-title-3-emphasized">TV Shows</p>
						<TvGenres />
					</div>
				)}
			</div>
		</div>
	);
}
