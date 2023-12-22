'use client';

import MediaCardLandscape from './MediaCardLandscape';
import GroupList from './ui/GroupList';
import Row from './ui/Row';
import Seperator from './ui/Seperator';
import { Season, MediaType } from '@/app/types';
import { CreatePosterUrl } from '@/app/utils';
import Button from '@/components/ui/Button';
import Sheet from '@/components/ui/Sheet';
import ToggleButton from '@/components/ui/ToggleButton';
import { useState } from 'react';

type RequestProps = {
	type: MediaType;
	seasons?: Season[];
};

export default function Request({ type, seasons }: RequestProps) {
	const [requesting, setRequesting] = useState(false);

	const typeText = type === MediaType.MOVIE ? 'Movie' : 'Series';

	//removes season 0 from seasons array
	const filteredSeasons = seasons.filter((season) => season.seasonNumber !== 0);

	return (
		<>
			<Button
				className="bg-system-indigo-light dark:bg-system-indigo-dark"
				text="Request"
				onClick={() => setRequesting(true)}
			/>
			{requesting && (
				<Sheet title={`Request ${typeText}`} closeFunction={() => setRequesting(false)}>
					<div className="pb-nav z-40 flex h-full w-full flex-col items-center justify-between gap-[18px]">
						{/* Seasons / Movies */}
						<div className="no-scrollbar flex max-h-[385px] w-full flex-grow-0 snap-y flex-col overflow-auto rounded-xl bg-system-secondary-light px-4 dark:bg-system-secondary-dark-elevated">
							{filteredSeasons.map((season: Season, index: number) => (
								<>
									<MediaCardLandscape
										key={season.id}
										className="py-4"
										imageUrl={CreatePosterUrl(season.posterPath)}
										title={season.name}
										details={season.airDate?.split('-')[0]}
									>
										<ToggleButton isToggled={true} isDisabled={false} />
									</MediaCardLandscape>
									{index !== filteredSeasons.length - 1 && <Seperator />}
								</>
							))}
						</div>
						{/* Advanced */}
						<GroupList header="Advanced">
							<Row title="Quality Profile" detail="Plex-1080p" />
							<Seperator className="pl-4" />
							<Row title="Request As" detail="txrisk27" />
						</GroupList>

						{/* Request Button */}
						<Button
							className="bg-system-indigo-light dark:bg-system-indigo-dark"
							text="Request 2 Seasons"
							onClick={() => setRequesting(false)}
						/>
					</div>
				</Sheet>
			)}
		</>
	);
}
