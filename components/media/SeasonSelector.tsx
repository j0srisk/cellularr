'use client';

import { Season } from '@/app/types';
import { useRouter, useParams } from 'next/navigation';

export default function SeasonSelector({
	selectedSeason,
	seasons,
	handleSeasonChange,
}: {
	selectedSeason: Season;
	seasons: Season[];
	handleSeasonChange: (seasonNumber: number) => void;
}) {
	const router = useRouter();
	const params = useParams<{ id: string; seasonNumber: string }>();

	return (
		<div className="w-full px-4">
			<div className="relative flex w-fit flex-row items-center justify-between gap-2 rounded-[6px] bg-fill-tetiary-light px-[11px] py-[6px] dark:bg-fill-tetiary-dark">
				<p className="text-body-emphasized">{selectedSeason?.name}</p>
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
					defaultValue={selectedSeason?.seasonNumber}
					className="absolute inset-0 h-full w-full opacity-0"
					onChange={(e) => {
						handleSeasonChange(parseInt(e.target.value));
					}}
				>
					{seasons.map((season) => (
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
	);
}
