'use client';

import { MovieDetails, MediaStatus } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

export default function ProcessingButton({ media }: { media: MovieDetails }) {
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const Router = useRouter();

	const fetcher = (...args: any[]) =>
		fetch(...args, { method: 'GET', cache: 'no-store' }).then((res) => res.json());

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
						const progress = (
							((data.mediaInfo.downloadStatus[0].size - data.mediaInfo.downloadStatus[0].sizeLeft) /
								data.mediaInfo.downloadStatus[0].size) *
							100
						).toFixed(2);
						setDownloadProgress(progress);
						console.log(progress);
						//movie has completed downloading but is still processing
					} else if (data.mediaInfo.downloadStatus[0].status === 'completed') {
						setIsDownloading(false);
						console.log('completed');
					}
					//movie is available
				}
			} else if (data.mediaInfo?.status === MediaStatus.AVAILABLE) {
				console.log('available');
				Router.refresh();
			} else {
				setIsDownloading(false);
				console.log('not downloading');
			}
		},
	});

	console.log(isDownloading);

	return (
		<div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black">
			{!isLoading ? (
				<>
					{isDownloading ? (
						<>
							<svg
								stroke="currentColor"
								viewBox="-2 -2 42 42"
								xmlns="http://www.w3.org/2000/svg"
								className="z-20 h-5 w-5"
							>
								<g transform="translate(1 1)" strokeWidth="6" fill="none">
									<circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
									<path d="M36 18c0-9.94-8.06-18-18-18">
										<animateTransform
											attributeName="transform"
											dur="1.5s"
											from="0 18 18"
											repeatCount="indefinite"
											to="360 18 18"
											type="rotate"
										></animateTransform>
									</path>
								</g>
							</svg>
							<p className="font-bold">Downloading </p>
						</>
					) : (
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
							</svg>

							<p className="font-bold">Request Approved</p>
						</>
					)}
				</>
			) : (
				<p className="font-bold">Updating Status</p>
			)}
		</div>
	);
}
