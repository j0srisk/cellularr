import { getTrending, getWatchlist } from '@/app/actions';
import GenreCard from '@/components/Discover/GenreCard';
import useSWR from 'swr';

export default function WatchlistCard() {
	const { data: watchlist } = useSWR(['watchlist', 1, 'en'], () => getWatchlist('watchlist', 1));

	if (watchlist) {
		console.log(watchlist);
		return <GenreCard name="Watchlist" genreId={0} backdropPath={''} href="/discover/watchlist" />;
	} else {
		return null;
	}
}
