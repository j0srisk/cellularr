import { MediaStatus, MediaType, TvDetails } from '@/app/types';
import Request from '@/components/Request';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function StatusButton({ tvDetails }: { tvDetails: TvDetails }) {
	if (!tvDetails.mediaInfo) {
		return <Request type={MediaType.TV} text={'Request Series'} seasons={tvDetails.seasons} />;
	}

	let allRequested = true;
	tvDetails.seasons.forEach((season: any) => {
		tvDetails.mediaInfo.seasons.forEach((mediaInfoSeason: any) => {
			if (season.seasonNumber === mediaInfoSeason.seasonNumber) {
				season.status = mediaInfoSeason.status;
				if (
					season.status !== MediaStatus.AVAILABLE &&
					season.status !== MediaStatus.PARTIALLY_AVAILABLE &&
					season.status !== MediaStatus.PENDING &&
					season.status !== MediaStatus.PROCESSING
				) {
					allRequested = false;
				}
			}
		});
	});

	if (allRequested) {
		return (
			<Link href={tvDetails.mediaInfo.iOSPlexUrl} className="w-full">
				<Button text="Play on Plex" className="bg-white text-label-primary-light" />
			</Link>
		);
	} else {
		return (
			<>
				<Link href={tvDetails.mediaInfo.iOSPlexUrl} className="w-full">
					<Button text="Play on Plex" className="bg-white text-label-primary-light" />
				</Link>
				<Request type={MediaType.TV} text={'Request More'} seasons={tvDetails.seasons} />
			</>
		);
	}
}
