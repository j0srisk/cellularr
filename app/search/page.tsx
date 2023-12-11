'use client';

import { MovieDetails } from '@/app/types';
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
			if (results[key].mediaType === 'movie') {
				const movieDetails: MovieDetails = results[key];
				setResults((results) => [...results, movieDetails]);
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
		<div className="flex h-full w-full flex-col px-4">
			<Heading heading="Search" subheading="Overseerr" />
			<div className="mb-4 flex w-full items-center gap-2 rounded-lg bg-zinc-400/30 pl-4 pr-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-4 w-4 flex-shrink-0 opacity-60"
				>
					<path
						fillRule="evenodd"
						d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
						clipRule="evenodd"
					/>
				</svg>
				<input
					type="text"
					placeholder="Search..."
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
					className="w-full bg-transparent p-1.5 text-white placeholder-white/60 outline-none"
				/>
				{search && (
					<button className="flex items-center" onClick={() => router.push('/search')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-5 w-5 opacity-60"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				)}
			</div>
			<div className="flex h-full w-full flex-col justify-start gap-2 overflow-auto pb-2">
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
									<>
										{results.map((movieDetails: MovieDetails) => (
											<MediaCard key={movieDetails.id} movieDetails={movieDetails} />
										))}
									</>
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
