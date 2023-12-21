'use client';

import { ContentRating, Season, TvDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import { GetSeason } from '@/app/utils';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';
import Seperator from '@/components/ui/Seperator';
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

	return (
		<SectionTemplate
			heading={
				<select
					className="w-fit appearance-none bg-transparent focus:shadow-none focus:outline-0"
					defaultValue={1}
					onChange={(event) => updateSeason(parseInt(event.target.value))}
				>
					{tvDetails.seasons.map((season) => (
						<option key={season.id} value={season.seasonNumber}>
							{season.name}
						</option>
					))}
				</select>
			}
		>
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
						<p className="text-label-secondary-dark text-footnote w-full text-left">
							{episode.overview}
						</p>
					</MediaCardSmall>
				))}
			</SnapCarousel>
			<Seperator className="px-4" />
		</SectionTemplate>
	);
}
