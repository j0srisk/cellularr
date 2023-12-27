import { MediaStatus, Series, MediaType } from '@/app/types';
import Request from '@/components/Request';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function StatusButton({ series }: { series: Series }) {
	if (series.requestStatus === MediaStatus.UNKNOWN) {
		return (
			<Request
				type={MediaType.TV}
				id={series.id}
				text={'Request Series'}
				seasons={series.seasons}
			/>
		);
	}

	if (series.requestStatus === MediaStatus.AVAILABLE) {
		return (
			<Link href={series.iOSPlexUrl || '#'} className="w-full">
				<Button text="Play on Plex" className="bg-white text-label-primary-light" />
			</Link>
		);
	}

	const filteredSeasons = series.seasons.filter((season) => season.seasonNumber !== 0);

	if (filteredSeasons) {
		filteredSeasons.forEach((season) => {
			console.log(
				'Season ' +
					season.seasonNumber +
					' is ' +
					MediaStatus[season.requestStatus ? season.requestStatus : 1],
			);
		});
	}

	if (filteredSeasons.some((season) => season.requestStatus === MediaStatus.UNKNOWN)) {
		console.log('At least one season is still unknown');
		return (
			<>
				<Link href={series.iOSPlexUrl || '#'} className="w-full">
					<Button text="Play on Plex" className="bg-white text-label-primary-light" />
				</Link>
				<Request
					type={MediaType.TV}
					id={series.id}
					text={'Request More'}
					seasons={series.seasons}
				/>
			</>
		);
	} else {
		console.log('All seasons are known');
		if (series.iOSPlexUrl) {
			return (
				<Link href={series.iOSPlexUrl || '#'} className="w-full">
					<Button text="Play on Plex" className="bg-white text-label-primary-light" />
				</Link>
			);
		} else {
			return <Button text="Requested" className="bg-white text-label-primary-light" />;
		}
	}
}
