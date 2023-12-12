'use client';

import { MovieDetails } from '@/app/types';
import { useEffect } from 'react';

export default function SaveToRecentSearches({ movieDetails }: { movieDetails: MovieDetails }) {
	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
			// Remove movieDetails from recent searches if it already exists
			for (let i = 0; i < recentSearches.length; i++) {
				if (recentSearches[i].id === movieDetails.id) {
					recentSearches.splice(i, 1);
				}
			}
			// Add movieDetails to the beginning of the array
			recentSearches.unshift(movieDetails);
			// Remove the last item in the array if it is longer than 10 items
			if (recentSearches.length > 8) {
				recentSearches.splice(8);
			}
			localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		}
	}, []);
	// Save movieDetails in a recent searches array in local storage

	return <></>;
}
