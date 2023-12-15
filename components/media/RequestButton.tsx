'use client';

import { MovieDetails, MediaStatus } from '@/app/types';
import ProcessingStatus from '@/components/media/ProcessingStatus';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RequestButton({ media }: { media: MovieDetails }) {
	const router = useRouter();

	const handleRequest = async () => {
		console.log('requesting');
		const response = await fetch('/api/overseerr/request', {
			method: 'POST',
			body: JSON.stringify({
				mediaType: media.mediaType,
				mediaId: media.id,
				userId: 6,
			}),
		});
		const data = await response.json();
		router.refresh();
	};

	if (!media.mediaInfo || media.mediaInfo.status === MediaStatus.UNKNOWN) {
		return (
			<button
				className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black"
				onClick={handleRequest}
			>
				<p className="font-bold">Request</p>
			</button>
		);
	} else if (media.mediaInfo.status === MediaStatus.PENDING) {
		return (
			<div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black">
				<p className="font-bold">Requested</p>
			</div>
		);
	} else if (media.mediaInfo.status === MediaStatus.PROCESSING) {
		return (
			<div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black">
				<p className="font-bold">
					<ProcessingStatus media={media} />
				</p>
			</div>
		);
	} else if (
		media.mediaInfo.status === MediaStatus.PARTIALLY_AVAILABLE ||
		media.mediaInfo.status === MediaStatus.AVAILABLE
	) {
		return (
			<Link
				href={media.mediaInfo?.iOSPlexUrl ? media.mediaInfo.iOSPlexUrl : 'https://app.plex.tv'}
				className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black"
			>
				<p className="font-bold">Watch on Plex</p>
			</Link>
		);
	} else {
		return (
			<div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black">
				<p className="font-bold">{media.mediaInfo.status}</p>
			</div>
		);
	}
}
