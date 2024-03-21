'use client';

import { getTrending } from '@/app/actions';
import PosterGrid from '@/components/Discover/PosterGrid';
import Section from '@/components/Section';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export default function DiscoverTrendingPage() {
	const { data: results } = useSWR('trending', () => getTrending(1));

	if (results) {
		return (
			<div>
				<p className="pb-4 text-title-1-emphasized">Trending</p>
				<PosterGrid results={results.results} />
			</div>
		);
	}
}
