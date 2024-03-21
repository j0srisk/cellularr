'use client';

import { getSearchResults, getSearch } from '@/app/actions';
import InfiniteResults from '@/components/Discover/InfiniteResults';
import MovieGenres from '@/components/Discover/MovieGenres';
import TvGenres from '@/components/Discover/TvGenres';
import Header from '@/components/Header';
import PersonCard from '@/components/PersonCard';
import PosterCard from '@/components/PosterCard';
import SearchBar from '@/components/ui/SearchBar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Page() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query');

	const [search, setSearch] = useState<string | ''>(searchQuery || '');

	const router = useRouter();

	return (
		<div className="pt-safe flex h-full w-full flex-col">
			<Header heading="Search">
				<div className="w-full pb-[15px] pt-[1px]">
					<SearchBar
						value={search}
						onChange={(e) => {
							const value = e.target.value;
							const encodedValue = encodeURIComponent(value);
							setSearch(value);
							router.replace('/search?query=' + encodedValue);
						}}
						clearFunction={() => {
							setSearch('');
							router.replace('/search');
						}}
					/>
				</div>
			</Header>

			<div className="no-scrollbar pb-nav flex h-full w-full flex-col justify-start overflow-y-auto overflow-x-hidden">
				{searchQuery ? (
					<>
						<InfiniteResults fetcher={getSearch} query={searchQuery} />
					</>
				) : (
					<div className="flex flex-col gap-6">
						<button onClick={() => router.push('/discover/trending')}>Trending</button>
						<MovieGenres />
						<TvGenres />
					</div>
				)}
			</div>
		</div>
	);
}
