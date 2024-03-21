import { getTrending } from '@/app/actions';
import GenreCard from '@/components/Discover/GenreCard';
import useSWR from 'swr';

export default function TrendingCard() {
	const { data: trending } = useSWR(['trending', 1, 'en'], () => getTrending('trending', 1));

	if (trending) {
		return (
			<GenreCard
				name="Trending"
				genreId={0}
				backdropPath={trending.results[4].backdropPath}
				href="/discover/trending"
			/>
		);
	}
	return <GenreCard name="Trending" genreId={0} backdropPath={''} href="/discover/trending" />;
}
