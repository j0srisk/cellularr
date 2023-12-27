import { Movie } from '@/app/types';
import CenteredMessage from '@/components/CenteredMessage';
import { useEffect, useState } from 'react';

export default function RecentSearches() {
	const [recentSearches, setRecentSearches] = useState<Movie[]>([]);

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
		return <CenteredMessage text="¡ seek and ye shall find !" />;
	} else {
		return (
			<div className="flex flex-col gap-2 pt-4">
				<div className="flex flex-row items-center justify-between px-1">
					<p className="text-xs font-black text-neutral-400">Recently Searched</p>
					<button onClick={clearRecentSearches} className="text-xs font-black text-blue-500">
						Clear
					</button>
				</div>
				<div className="flex flex-col gap-[1px] bg-zinc-800 pt-[1px]">
					{recentSearches.map((movieDetails: Movie) => (
						<></>
					))}
				</div>
			</div>
		);
	}
}
