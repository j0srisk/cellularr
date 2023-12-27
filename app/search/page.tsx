'use client';

import { CreatePosterUrl } from '../utils';
import { searchOverseerr } from '@/app/actions';
import { MediaType, MediaStatus, SearchResult } from '@/app/types';
import Header from '@/components/Header';
import MediaCardLandscape from '@/components/MediaCardLandscape';
import RecentSearches from '@/components/RecentSearches';
import SearchBar from '@/components/ui/SearchBar';
import Seperator from '@/components/ui/Seperator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';

export default function Page() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query');

	const [search, setSearch] = useState<string | ''>(searchQuery || '');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	//get search results from overseerr and add to results state
	async function fetchData(query: string, page: number = 1, language: string = 'en') {
		const results = await searchOverseerr(query);

		const searchResults = results.filter(
			(result: SearchResult) => result.mediaType !== MediaType.PERSON,
		);

		return searchResults;
	}

	useEffect(() => {
		(async () => {
			if (search) {
				setResults(await fetchData(search));
			}
		})();
	}, [search]);

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header heading="Search">
				<div className="w-full pb-[15px] pt-[1px]">
					<SearchBar
						value={search}
						onChange={(e) => {
							const value = e.target.value;
							const encodedValue = encodeURIComponent(value);
							setSearch(value);
							router.push('/search?query=' + encodedValue);
						}}
						clearFunction={() => {
							setSearch('');
							router.push('/search');
						}}
					/>
				</div>
			</Header>

			<div className="no-scrollbar pb-nav flex h-full w-full flex-col justify-start gap-[9px] overflow-y-auto overflow-x-hidden">
				{searchQuery ? (
					<>
						{results.length > 0 ? (
							<div className="flex w-full flex-col gap-[9px]">
								{results.map((searchResult) => (
									<Fragment key={searchResult.id}>
										<Link href={'/' + searchResult.mediaType + '/' + searchResult.id}>
											<MediaCardLandscape
												imageUrl={CreatePosterUrl(searchResult.posterPath)}
												title={searchResult.title || searchResult.name}
												details={
													searchResult.mediaType === MediaType.MOVIE
														? searchResult.releaseDate
															? 'Movie • ' + searchResult.releaseDate?.split('-')[0]
															: 'Movie'
														: searchResult.firstAirDate
															? 'Series • ' + searchResult.firstAirDate?.split('-')[0]
															: 'Series'
												}
											/>
										</Link>
										{results.indexOf(searchResult) !== results.length - 1 && (
											<Seperator className="px-0" />
										)}
									</Fragment>
								))}
							</div>
						) : (
							<div className="flex h-full w-full items-center justify-center">
								<p className="font-semibold opacity-60">No Results</p>
							</div>
						)}
					</>
				) : (
					<RecentSearches />
				)}
			</div>
		</div>
	);
}
