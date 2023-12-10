'use client';

import { MovieDetails } from '@/app/types';
import Heading from '@/components/Heading';
import MediaCard from '@/components/MediaCard';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Page() {
	const [results, setResults] = useState<MovieDetails[]>([]);

	const [isLoading, setIsLoading] = useState(false);
	const resultsContainerRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const searchParams = useSearchParams();

	const searchQuery = searchParams.get('query');

	const [search, setSearch] = useState<string | ''>(searchQuery || '');

	//get search results from overseerr and add to results state
	async function fetchData(query: string, page: number = 1, language: string = 'en') {
		const response = await fetch(
			'/api/overseerr/search?query=' + query + '&language=' + language + '&page=' + page,
		);

		setIsLoading(true);
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
			<div className="mb-4 flex w-full items-center gap-2 rounded-lg bg-zinc-400/30 px-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-5 w-5 opacity-60"
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
						//setResults([]);
						//fetchData(e.target.value);
					}}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							(e.target as HTMLInputElement).blur();
						}
					}}
					onBlur={() => {
						router.push('/search?query=' + search);
					}}
					className="w-full bg-transparent p-2 text-white placeholder-white/60 outline-none"
				/>
				{search && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-8 w-8"
						onClick={() => {
							router.push('/search');
							setSearch('');
							setResults([]);
						}}
					>
						<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
					</svg>
				)}
			</div>
			<div
				ref={resultsContainerRef}
				className="flex h-full w-full flex-col justify-start gap-2 overflow-auto pb-2"
			>
				{isLoading ? (
					<div className="flex h-full w-full flex-col items-center justify-center gap-2">
						<p className="font-semibold">Loading...</p>
					</div>
				) : (
					<>
						{results.map((movieDetails: MovieDetails) => (
							<MediaCard key={movieDetails.id} movieDetails={movieDetails} />
						))}
					</>
				)}
			</div>
		</div>
	);
}
