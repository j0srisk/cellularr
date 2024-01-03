import { SearchResult, MediaType } from '@/app/types';
import { CreatePosterUrl } from '@/app/utils';
import CenteredMessage from '@/components/CenteredMessage';
import MediaCardLandscape from '@/components/MediaCardLandscape';
import Seperator from '@/components/ui/Seperator';
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';

export default function RecentSearches() {
	const [recentSearches, setRecentSearches] = useState<SearchResult[]>([]);

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
			<div className="flex w-full flex-col ">
				<div className="flex flex-row items-center justify-between pb-[8px] text-footnote">
					<p className="text-label-secondary-light dark:text-label-secondary-dark">
						Recently Viewed
					</p>
					<button
						onClick={clearRecentSearches}
						className="text-system-blue-light dark:text-system-blue-dark"
					>
						Clear
					</button>
				</div>
				<div className="flex w-full flex-col gap-2">
					<>
						{recentSearches.map((searchResult: SearchResult) => (
							<Fragment key={searchResult.id}>
								<Link href={'/app/' + searchResult.mediaType + '/' + searchResult.id}>
									<MediaCardLandscape
										imageUrl={CreatePosterUrl(searchResult.posterPath)}
										title={searchResult.title || searchResult.name}
										details={
											searchResult.mediaType === MediaType.MOVIE
												? searchResult.releaseDate
													? 'Movie • ' + searchResult.releaseDate?.split('-')[0]
													: 'Movie'
												: searchResult.firstAirDate
													? 'Series • ' + searchResult.firstAirDate?.split('-')[0]
													: 'Series'
										}
									/>
								</Link>

								{recentSearches.indexOf(searchResult) !== recentSearches.length - 1 && (
									<Seperator className="px-0" />
								)}
							</Fragment>
						))}
					</>
				</div>
			</div>
		);
	}
}
