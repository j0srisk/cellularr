'use client';

import { ContentRating, Season, TvDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import { GetSeason, FormatReleaseDate } from '@/app/utils';
import Divider from '@/components/Divider';
import SnapCarousel from '@/components/SnapCarousel';
import { ContentRatingBadge } from '@/components/media/Badges';
import SectionTemplate from '@/components/media/SectionTemplate';
import Image from 'next/image';
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
					<div
						style={{ width: `calc(66vw - 22px)` }}
						key={episode.id}
						className="flex flex-shrink-0 snap-start scroll-ml-4 flex-col gap-1"
					>
						<div className="relative aspect-video flex-shrink-0 overflow-hidden  rounded-lg">
							{episode.stillPath ? (
								<div className="h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-900">
									<Image
										src={CreateBackdropUrl(episode.stillPath)}
										alt={episode.name}
										width={300}
										height={300}
										className="z-20 h-full w-full object-cover object-center"
									/>
								</div>
							) : (
								<div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-900 text-off-white">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="h-8 w-8"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
										/>
									</svg>
								</div>
							)}
						</div>
						<div className="flex h-full w-full flex-col">
							<p className="w-full truncate text-xs font-medium uppercase text-neutral-400">
								Episode {episode.episodeNumber}
							</p>
							<p className="w-full truncate text-sm font-medium text-white">{episode.name}</p>
							<div className="flex flex-1">
								<p className="max-h-12 w-full overflow-hidden text-xs font-medium text-neutral-400">
									{episode.overview}
								</p>
							</div>
							<div className="flex w-fit items-center justify-between gap-2 pt-1 text-neutral-400">
								<p className="text-xs font-medium text-neutral-400">
									{FormatReleaseDate(episode.airDate)}
								</p>
								{contentRating && <ContentRatingBadge contentRating={contentRating.rating} />}
							</div>
						</div>
					</div>
				))}
			</SnapCarousel>
			<Divider />
		</SectionTemplate>
	);
}
