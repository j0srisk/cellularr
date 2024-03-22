'use client';

import { MediaType } from '@/app/types';
import PersonCard from '@/components/Common/PersonCard';
import PosterCard from '@/components/Common/PosterCard';
import GenreCard from '@/components/Search/GenreCard';
import { genreColorMap, genreNameMap } from '@/components/Search/constants';
import { MovieResult, TvResult, PersonResult, Results } from '@/services/overseerr/types/search';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

type InfiniteResultsProps = {
	fetcher: (query: string, page?: number, language?: string) => Promise<Results>;
	query: string;
	language?: string;
	showFeatured?: boolean;
	genreId?: number;
};

export default function InfiniteResults({
	fetcher,
	query,
	language = 'en',
	showFeatured = false,
	genreId = 0,
}: InfiniteResultsProps) {
	const [featuredMedia, setFeaturedMedia] = useState<MovieResult | TvResult>();
	const getKey = (pageIndex: number, previousPageData: Results) => {
		// reached the end
		if (previousPageData && previousPageData.page >= previousPageData.totalPages) return null;

		//console.log([query, pageIndex + 1, language]);
		// return the key of the next page
		return [query, pageIndex + 1, language];
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
		if (showFeatured && results) {
			const firstNotPersonMedia = results
				.slice(3)
				.find(
					(result): result is MovieResult | TvResult =>
						result.mediaType === MediaType.MOVIE || result.mediaType === MediaType.TV,
				);
			if (firstNotPersonMedia) {
				setFeaturedMedia(firstNotPersonMedia);
			}
		}
	}, [results]);

	const loadMore = () => {
		setSize(size + 1);
	};

	if (results) {
		return (
			<div className="no-scrollbar flex h-full w-full flex-col gap-4 overflow-auto">
				{results.length > 0 && (
					<div className="flex w-full flex-col items-center gap-4">
						{featuredMedia && (
							<div className="relative flex aspect-video w-full items-center justify-center">
								<Image
									src={`https://image.tmdb.org/t/p/w1280_filter(duotone,${genreColorMap[genreId]})${featuredMedia.backdropPath}`}
									alt={
										featuredMedia.mediaType === MediaType.MOVIE
											? featuredMedia.title
											: featuredMedia.name
									}
									width={1280}
									height={720}
									className="absolute h-full w-full"
								/>
								<p className="z-10 text-large-title-emphasized text-label-primary-dark">
									{genreNameMap[genreId]}
								</p>
							</div>
						)}
						<div className="grid h-fit w-full grid-cols-3 gap-2 px-4 pt-0">
							{results.map((result: MovieResult | TvResult | PersonResult) =>
								result.mediaType === 'person' ? (
									<PersonCard key={result.id} name={result.name} profilePath={result.profilePath} />
								) : (
									<PosterCard
										id={result.id}
										key={result.id}
										mediaType={result.mediaType}
										title={(result as TvResult).name || (result as MovieResult).title}
										posterPath={result.posterPath}
									/>
								),
							)}
						</div>
						{data && data[data.length - 1].page < data[data.length - 1].totalPages && (
							<button onClick={loadMore} disabled={isValidating}>
								{isValidating ? 'Loading...' : 'Load More'}
							</button>
						)}
					</div>
				)}
			</div>
		);
	}
}
