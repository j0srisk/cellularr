'use client';

import { SearchResult, MediaType, Movie, Series } from '@/app/types';
import Warning from 'postcss/lib/warning';
import { useEffect } from 'react';

export default function SaveToRecentSearches({
	movie,
	series,
}: {
	movie?: Movie;
	series?: Series;
}) {
	useEffect(() => {
		if (!movie && !series) {
			console.error('SaveToRecentSearches component received no props');
			return;
		}
		if (movie && series) {
			console.error('SaveToRecentSearches component received both movie and series props');
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

		if (typeof window !== 'undefined' && window.localStorage) {
			const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');

			// Remove search from recent searches if it already exists
			recentSearches.forEach((recentSearch: SearchResult) => {
				if (recentSearch.id === searchResult.id) {
					recentSearches.splice(recentSearches.indexOf(recentSearch), 1);
				}
			});

			// Add latest search to the beginning of the array
			recentSearches.unshift(searchResult);

			// Remove the last item in the array if it is longer than X items
			if (recentSearches.length > 8) {
				recentSearches.splice(8);
			}

			localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		}
	}, [movie, series]);

	return null;
}
