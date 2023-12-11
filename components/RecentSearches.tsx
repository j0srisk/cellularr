import { MovieDetails } from '@/app/types';
import MediaCard from '@/components/MediaCard';
import { useEffect, useState } from 'react';

export default function RecentSearches() {
	const [recentSearches, setRecentSearches] = useState<MovieDetails[]>([]);

	function clearRecentSearches() {
		if (typeof window !== 'undefined' && window.localStorage) {
			localStorage.removeItem('recentSearches');
			setRecentSearches([]);
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
			setRecentSearches(recentSearches);
		}
	}, []);

	if (recentSearches.length === 0) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center">
				<p className="font-semibold opacity-60">Seek and ye shall find</p>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col gap-2">
				<div className="flex flex-row items-center justify-between px-1">
					<p className="font-semibold text-white">Recent Searches</p>
					<button onClick={clearRecentSearches} className="text-xs text-white opacity-60">
						Clear
					</button>
				</div>
				<div className="flex flex-col gap-2">
					{recentSearches.map((movieDetails: MovieDetails) => (
						<MediaCard key={movieDetails.id} movieDetails={movieDetails} />
					))}
				</div>
			</div>
		);
	}
}
