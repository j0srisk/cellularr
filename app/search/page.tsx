'use client';

import { getSearchResults } from '@/app/actionss';
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
	const [results, setResults] = useState([]);

	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (search) {
				const searchResultsResponse = await getSearchResults(search);
				setResults(searchResultsResponse.results);
			}
		})();
	}, [search]);

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4 md:py-1">
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

			<div className="no-scrollbar pb-nav flex h-full w-full flex-col justify-start gap-[9px] overflow-y-auto overflow-x-hidden">
				{searchQuery ? (
					<div className="grid w-full grid-cols-3 gap-2">
						{results.map((searchResult: any) =>
							searchResult.mediaType === 'person' ? (
								<PersonCard
									key={searchResult.id}
									name={searchResult.name}
									profilePath={searchResult.profilePath}
								/>
							) : (
								<PosterCard
									key={searchResult.id}
									title={searchResult.originalTitle}
									posterPath={searchResult.posterPath}
									onClick={() => {
										router.push('/' + searchResult.mediaType + '/' + searchResult.id);
									}}
								/>
							),
						)}
					</div>
				) : (
					<p>Discover</p>
				)}
			</div>
		</div>
	);
}
