'use client';

import MediaCardLandscape from './MediaCardLandscape';
import GroupList from './ui/GroupList';
import Row from './ui/Row';
import Seperator from './ui/Seperator';
import { requestMedia } from '@/app/actions';
import { Season, MediaType, MediaStatus } from '@/app/types';
import { CreatePosterUrl } from '@/app/utils';
import Button from '@/components/ui/Button';
import Sheet from '@/components/ui/Sheet';
import ToggleButton from '@/components/ui/ToggleButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Fragment } from 'react';

type RequestProps = {
	type: MediaType;
	id: number;
	text: string;
	seasons: Season[];
};

export default function Request({ type, id, text, seasons }: RequestProps) {
	const [requesting, setRequesting] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);

	const router = useRouter();

	const typeText = type === MediaType.MOVIE ? 'Movie' : 'Series';

	//removes season 0 from seasons array
	const filteredSeasons = seasons.filter((season) => season.seasonNumber !== 0);

	return (
		<>
			<Button
				className="bg-system-indigo-light dark:bg-system-indigo-dark"
				text={text}
				onClick={() => setRequesting(true)}
			/>
			{requesting && (
				<Sheet title={`Request ${typeText}`} closeFunction={() => setRequesting(false)}>
					<div className="z-40 flex h-full w-full flex-col gap-[18px] overflow-hidden">
						{/* Seasons / Movies */}
						<div className="no-scrollbar flex max-h-[385px] w-full flex-shrink snap-y flex-col overflow-auto rounded-xl bg-system-secondary-light px-4 dark:bg-system-secondary-dark-elevated">
							{filteredSeasons.map((season: Season, index: number) => (
								<Fragment key={season.id}>
									<MediaCardLandscape
										className="py-4"
										imageUrl={CreatePosterUrl(season.posterPath)}
										title={season.name}
										details={season.airDate?.split('-')[0]}
									>
										{season.requestStatus === MediaStatus.UNKNOWN && (
											<ToggleButton
												isToggled={false}
												color={'fd'}
												onToggle={() => {
													if (selectedSeasons.includes(season)) {
														setSelectedSeasons(selectedSeasons.filter((s) => s !== season));
													} else {
														setSelectedSeasons([...selectedSeasons, season]);
													}
												}}
											/>
										)}

										{season.requestStatus === MediaStatus.PENDING ||
										season.requestStatus === MediaStatus.PROCESSING ? (
											<ToggleButton
												isToggled={true}
												isDisabled={true}
												color={'bg-system-blue-light'}
											/>
										) : null}

										{season.requestStatus === MediaStatus.AVAILABLE ||
										season.requestStatus === MediaStatus.PARTIALLY_AVAILABLE ? (
											<ToggleButton isToggled={true} isDisabled={true} />
										) : null}
									</MediaCardLandscape>
									{index !== filteredSeasons.length - 1 && <Seperator />}
								</Fragment>
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
							style={{ opacity: selectedSeasons.length === 0 ? 0.5 : 1 }}
							className="bg-system-indigo-light dark:bg-system-indigo-dark"
							text={
								selectedSeasons.length === 0
									? 'Select a season'
									: 'Request ' + selectedSeasons.length + ' seasons'
							}
							disabled={selectedSeasons.length === 0 || isProcessing}
							onClick={() => {
								setIsProcessing(true);
								requestMedia(
									type,
									id,
									selectedSeasons.map((season) => season.seasonNumber),
								).then((response) => {
									console.log(response);
									router.refresh();
									setIsProcessing(false);
									setSelectedSeasons([]);
									setRequesting(false);
								});
							}}
						/>
					</div>
				</Sheet>
			)}
		</>
	);
}
