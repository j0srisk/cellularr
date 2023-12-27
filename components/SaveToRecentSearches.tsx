'use client';

import { SearchResult, MediaType, Movie, Series } from '@/app/types';
import { useEffect } from 'react';

export default function SaveToRecentSearches({
	movie,
	series,
}: {
	movie?: Movie;
	series?: Series;
}) {
	useEffect(() => {
		console.log('saving to recent searches');
		if (!movie && !series) {
			console.log('no movie or series');
			return;
		}
		if (movie && series) {
			console.log('both movie and series');
			return;
		}

		const searchResult: SearchResult = {
			id: movie?.id || series!.id,
			mediaType: movie ? MediaType.MOVIE : MediaType.TV,
			title: movie?.title,
			name: series?.name,
			posterPath: movie?.posterPath || series?.posterPath || null,
			releaseDate: movie?.releaseDate,
			firstAirDate: series?.firstAirDate,
		};

		console.log(searchResult);

		if (typeof window !== 'undefined' && window.localStorage) {
			console.log('saving to local storage');
			const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
			// Remove movieDetails from recent searches if it already exists

			recentSearches.forEach((recentSearch: SearchResult) => {
				if (recentSearch.id === searchResult.id) {
					recentSearches.splice(recentSearches.indexOf(recentSearch), 1);
				}
			});

			// Add movieDetails to the beginning of the array
			recentSearches.unshift(searchResult);

			// Remove the last item in the array if it is longer than 10 items
			if (recentSearches.length > 8) {
				recentSearches.splice(8);
			}

			localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		}
	}, []);

	return <></>;
}
