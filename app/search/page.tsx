'use client';

import { CreatePosterUrl } from '../utils';
import { MediaType, MediaStatus } from '@/app/types';
import Header from '@/components/Header';
import MediaCardLandscape from '@/components/MediaCardLandscape';
import RecentSearches from '@/components/RecentSearches';
import SearchBar from '@/components/ui/SearchBar';
import Seperator from '@/components/ui/Seperator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type SearchResult = {
	id: number;
	title?: string;
	name?: string;
	posterPath: string;
	backdropPath: string;
	status?: MediaStatus;
	mediaType: MediaType;
	releaseDate?: string;
	firstAirDate?: string;
};

export default function Page() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query');

	const [search, setSearch] = useState<string | ''>(searchQuery || '');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	//get search results from overseerr and add to results state
	async function fetchData(query: string, page: number = 1, language: string = 'en') {
		const response = await fetch(
			'/api/overseerr/search?query=' + query + '&language=' + language + '&page=' + page,
		);

		const data = await response.json();

		const results = data.results;

		for (let key in results) {
			//filters persons from results
			if (results[key].mediaType === MediaType.MOVIE || results[key].mediaType === MediaType.TV) {
				const searchResult: SearchResult = results[key];
				setResults((results) => [...results, searchResult]);
			}
		}
		setIsLoading(false);
	}

	useEffect(() => {
		setResults([]);
		if (searchQuery) {
			fetchData(searchQuery);
		}
		setSearch(searchQuery || '');
	}, [searchQuery]);

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header heading="Search">
				<SearchBar
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onBlur={() => {
						setIsLoading(true);
						router.push('/search?query=' + search);
					}}
					clearFunction={() => {
						setSearch('');
						router.push('/search');
					}}
				/>
			</Header>

			<div className="no-scrollbar pb-nav flex h-full w-full flex-col justify-start gap-2 overflow-y-auto overflow-x-hidden">
				{searchQuery ? (
					<>
						{isLoading ? (
							<div className="flex h-full w-full items-center justify-center gap-2">
								<p className="hidden font-semibold opacity-60">Loading ...</p>
								<svg
									stroke="currentColor"
									viewBox="-2 -2 42 42"
									xmlns="http://www.w3.org/2000/svg"
									className="z-20 h-6 w-6"
								>
									<g transform="translate(1 1)" strokeWidth="6" fill="none">
										<circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
										<path d="M36 18c0-9.94-8.06-18-18-18">
											<animateTransform
												attributeName="transform"
												dur="1.5s"
												from="0 18 18"
												repeatCount="indefinite"
												to="360 18 18"
												type="rotate"
											></animateTransform>
										</path>
									</g>
								</svg>
							</div>
						) : (
							<>
								{results.length > 0 ? (
									<div className="flex w-full flex-col gap-[9px]">
										{results.map((searchResult) => (
											<>
												<Link href={'/' + searchResult.mediaType + '/' + searchResult.id}>
													<MediaCardLandscape
														key={searchResult.id}
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
											</>
										))}
									</div>
								) : (
									<div className="flex h-full w-full items-center justify-center">
										<p className="font-semibold opacity-60">No Results</p>
									</div>
								)}
							</>
						)}
					</>
				) : (
					<RecentSearches />
				)}
			</div>
		</div>
	);
}
