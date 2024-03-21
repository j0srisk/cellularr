'use client';

import { MediaType } from '@/app/types';
import GenreCard from '@/components/Discover/GenreCard';
import PosterGrid from '@/components/Discover/PosterGrid';
import { MovieResult, TvResult, PersonResult, Results } from '@/services/overseerr/types/search';
import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

type InfiniteResultsProps = {
	fetcher: (query: string, page?: number, language?: string) => Promise<Results>;
	query: string;
	language?: string;
};

export default function InfiniteResults({ fetcher, query, language }: InfiniteResultsProps) {
	const [highlightedMedia, setHighlightedMedia] = useState<MovieResult | TvResult>();
	const getKey = (pageIndex: number, previousPageData: Results) => {
		// reached the end
		if (previousPageData && previousPageData.page >= previousPageData.totalPages) return null;

		// return the key of the next page
		return [{ query }, pageIndex + 1, language];
	};

	const { data, size, setSize, isValidating } = useSWRInfinite(getKey, (key) =>
		fetcher(query, Number(key[1]), language),
	);

	const results = data
		? data.reduce<(MovieResult | TvResult | PersonResult)[]>(
				(acc, pageData) => [...acc, ...pageData.results],
				[],
			)
		: [];

	useEffect(() => {
		if (results) {
			const firstNotPersonMedia = results.find(
				(result): result is MovieResult | TvResult =>
					result.mediaType === MediaType.MOVIE || result.mediaType === MediaType.TV,
			);
			if (firstNotPersonMedia) {
				setHighlightedMedia(firstNotPersonMedia);
			}
		}
	}, [results]);

	const loadMore = () => {
		setSize(size + 1);
	};

	if (results && results.length > 0) {
		return (
			<div className="no-scrollbar h-full overflow-auto pb-4">
				<div className="pb-nav flex w-full flex-col items-center gap-2 px-4">
					{highlightedMedia && (
						<GenreCard
							name={
								highlightedMedia.mediaType === MediaType.MOVIE
									? highlightedMedia.title
									: highlightedMedia.name
							}
							genreId={878}
							backdropPath={highlightedMedia.backdropPath}
							href={`/discover/${highlightedMedia.mediaType}s/${highlightedMedia.id}`}
						/>
					)}
					<PosterGrid results={results} />
					{data && data[data.length - 1].page < data[data.length - 1].totalPages && (
						<button onClick={loadMore} disabled={isValidating}>
							{isValidating ? 'Loading...' : 'Load More'}
						</button>
					)}
				</div>
			</div>
		);
	}
}
