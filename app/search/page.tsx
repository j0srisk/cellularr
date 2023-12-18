'use client';

import { MovieDetails } from '@/app/types';
import AppleHeader from '@/components/AppleHeader';
import Heading from '@/components/Heading';
import MediaCard from '@/components/MediaCard';
import RecentSearches from '@/components/RecentSearches';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Page() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('query');

	const [search, setSearch] = useState<string | ''>(searchQuery || '');
	const [results, setResults] = useState<MovieDetails[]>([]);
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
			//only add movies to results

			const movieDetails: MovieDetails = results[key];
			setResults((results) => [...results, movieDetails]);
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
		<div className="flex h-full w-full flex-col px-4">
			<AppleHeader heading="Search" />
			<div className="my-2 flex w-full items-center gap-2 rounded-lg bg-zinc-800 px-2 ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2.5}
					stroke="currentColor"
					className="h-4 w-4 flex-shrink-0 stroke-neutral-400"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>

				<input
					type="text"
					placeholder="Search Movies & TV"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							(e.target as HTMLInputElement).blur();
						}
					}}
					onBlur={() => {
						setIsLoading(true);
						router.push('/search?query=' + search);
					}}
					className="w-full bg-transparent py-1.5 font-semibold text-white placeholder-neutral-400 outline-none"
				/>
				{search && (
					<button className="flex items-center" onClick={() => router.push('/search')}>
						<div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={4}
								stroke="currentColor"
								className="h-3 w-3 stroke-zinc-800"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</div>
					</button>
				)}
			</div>
			<div className="no-scrollbar flex h-full w-full flex-col justify-start gap-2 overflow-auto pb-2">
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
									<div className="flex flex-col gap-[1px] bg-zinc-800">
										{results.map((movieDetails: MovieDetails) => (
											<MediaCard key={movieDetails.id} movieDetails={movieDetails} />
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
