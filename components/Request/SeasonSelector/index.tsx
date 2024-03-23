import { CombinedSeason, MediaType } from '@/app/types';
import Card from '@/components/Common/Card';
import PosterCard from '@/components/Common/PosterCard';
import Separator from '@/components/Common/Separator';
import ToggleButton from '@/components/Common/Toggle';
import { MediaStatus } from '@/services/overseerr/types/common';
import { Fragment } from 'react';

export default function SeasonSelector({
	setSelectedSeasons,
	selectedSeasons,
	seasons,
}: {
	setSelectedSeasons: React.Dispatch<React.SetStateAction<any[]>>;
	selectedSeasons: CombinedSeason[];
	seasons: CombinedSeason[];
}) {
	const unrequestedSeasons = seasons.filter((season) =>
		season.seasonInfo ? season.seasonInfo.status === MediaStatus.UNKNOWN : true,
	);

	const handleSelectAllSeasons = () => {
		if (selectedSeasons.length === unrequestedSeasons.length) {
			setSelectedSeasons([]);
		} else {
			setSelectedSeasons(unrequestedSeasons);
		}
	};

	return (
		<Card className="flex w-full flex-col rounded-lg bg-system-secondary-light dark:bg-system-secondary-dark">
			{seasons.length > 1 && (
				<div className="flex w-full flex-col items-center">
					<div className="flex w-full items-center justify-between gap-2 p-3 py-2.5">
						<p className="text-body-emphasized">Select All</p>
						<p>{selectedSeasons.length === unrequestedSeasons.length ? 'true' : 'false'}</p>
						<ToggleButton
							toggled={selectedSeasons.length === unrequestedSeasons.length ? true : false}
							disabled={unrequestedSeasons.length === 0}
							color="bg-system-indigo-light dark:bg-system-indigo-dark"
							onToggle={() => {
								handleSelectAllSeasons();
							}}
						/>
					</div>
					<Separator />
				</div>
			)}
			{seasons.map((season, index) => (
				<Fragment key={season.seasonDetails.id}>
					<div className="flex w-full items-center gap-2 p-3 py-2.5">
						<PosterCard
							id={season.seasonDetails.id}
							posterPath={season.seasonDetails.posterPath}
							title={season.seasonDetails.name}
							mediaType={MediaType.TV}
							className="w-16 rounded-md border-none"
						/>
						<div className="flex w-full flex-col">
							<p className="text-body-emphasized">{season.seasonDetails.name}</p>
							<p className="text-label-secondary-light dark:text-label-secondary-dark">
								{season.seasonDetails.episodeCount} episodes
							</p>
						</div>
						<p>
							{selectedSeasons.some(
								(selectedSeason) => selectedSeason.seasonDetails.id === season.seasonDetails.id,
							)
								? 'true'
								: 'false'}
						</p>

						<ToggleButton
							toggled={
								selectedSeasons.some(
									(selectedSeason) => selectedSeason.seasonDetails.id === season.seasonDetails.id,
								) || !!(season.seasonInfo && season.seasonInfo.status !== MediaStatus.UNKNOWN)
							}
							color={
								season.seasonInfo?.status === MediaStatus.AVAILABLE
									? ''
									: 'bg-system-indigo-light dark:bg-system-indigo-dark'
							}
							disabled={
								season.seasonInfo ? season.seasonInfo?.status !== MediaStatus.UNKNOWN : false
							}
							onToggle={() => {
								if (
									selectedSeasons.some(
										(selectedSeason) => selectedSeason.seasonDetails.id === season.seasonDetails.id,
									)
								) {
									setSelectedSeasons(
										selectedSeasons.filter(
											(selectedSeason) =>
												selectedSeason.seasonDetails.id !== season.seasonDetails.id,
										),
									);
								} else {
									setSelectedSeasons([...selectedSeasons, season]);
								}
							}}
						/>
					</div>
					{index !== seasons.length - 1 && <Separator />}
				</Fragment>
			))}
		</Card>
	);
}
