'use client';

import { getTrending } from '@/app/actions';
import PosterGrid from '@/components/Discover/PosterGrid';
import useSWR from 'swr';

export default function DiscoverTrendingPage() {
	const { data: results } = useSWR('trending', () => getTrending(1));

	if (results) {
		return <PosterGrid results={results.results} />;
	}
}
