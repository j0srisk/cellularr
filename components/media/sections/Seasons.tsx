'use client';

import { ContentRating, Season, TvDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import { GetSeason } from '@/app/utils';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';
import Seperator from '@/components/ui/Seperator';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Seasons({
	tvDetails,
	contentRating,
	firstSeason,
}: {
	tvDetails: TvDetails;
	contentRating: ContentRating;
	firstSeason: Season;
}) {
	const [season, setSeason] = useState(firstSeason);

	const updateSeason = async (seasonNumber: number) => {
		setSeason(await GetSeason(tvDetails.id, seasonNumber));
	};

	const searchParams = useSearchParams();

	const seasonNumber = parseInt(searchParams.get('season') || '1');

	console.log(seasonNumber);

	return (
		<SectionTemplate>
			<div className="w-full px-4">
				<div className="relative flex w-fit flex-row items-center justify-between gap-2 rounded-[6px] bg-fill-tetiary-light px-[11px] py-[6px] text-system-blue-light dark:bg-fill-tetiary-dark">
					<p className="text-body-emphasized">{season.name}</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={3}
						stroke="currentColor"
						className="h-4 w-4"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
					</svg>
					<select
						defaultValue={season.seasonNumber}
						className="absolute inset-0 h-full w-full opacity-0"
						onChange={(e) => updateSeason(parseInt(e.target.value))}
					>
						{tvDetails.seasons.map((season) => (
							<option
								key={season.id}
								value={season.seasonNumber}
								className="text-body-emphasized font-black"
							>
								{season.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<SnapCarousel>
				{season.episodes.map((episode) => (
					<MediaCardSmall
						key={episode.id}
						className="w-[calc(66%)]"
						heading={`Episode ${episode.episodeNumber}`}
						title={episode.name}
						imageUrl={CreateBackdropUrl(episode.stillPath)}
						viewWidth={66}
					>
						<p className="line-clamp-3 w-full text-left text-footnote text-label-secondary-light dark:text-label-secondary-dark">
							{episode.overview}
						</p>
					</MediaCardSmall>
				))}
			</SnapCarousel>
			<Seperator className="px-4" />
		</SectionTemplate>
	);
}
