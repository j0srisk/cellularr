import { MovieDetails, MediaStatus } from '@/app/types';
import { fetcher } from '@/app/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

export default function ProcessingStatus({ media }: { media: MovieDetails }) {
	const [isDownloading, setIsDownloading] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	const { error } = useSWR('/api/overseerr/' + media.mediaType + '/' + media.id, fetcher, {
		refreshInterval: 5000,
		onSuccess: (data: MovieDetails) => {
			setIsLoading(false);
			//movie has begun downloading
			if (data.mediaInfo?.downloadStatus) {
				if (data.mediaInfo.downloadStatus[0]) {
					//movie is still downloading
					if (data.mediaInfo.downloadStatus[0]?.status === 'downloading') {
						setIsDownloading(true);
						console.log('downloading');
						//movie has completed downloading but is still processing
					} else if (data.mediaInfo.downloadStatus[0].status === 'completed') {
						setIsDownloading(false);
						console.log('completed');
					}
				}
				//movie is available
			} else if (data.mediaInfo?.status === MediaStatus.AVAILABLE) {
				console.log('available');
				router.refresh();
			} else {
				setIsDownloading(false);
				console.log('not downloading');
			}
		},
	});

	if (isLoading) {
		return <>Checking Status</>;
	}

	if (isDownloading) {
		return <>Downloading...</>;
	} else {
		return <>Requested</>;
	}
}
