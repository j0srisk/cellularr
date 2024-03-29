'use client';

import { Download, MediaType } from '@/app/types';
import Header from '@/components/Header';
import Seperator from '@/components/ui/Seperator';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';

type DownloadStatusProps = {
	mediaType: MediaType;
	mediaId: number;
	initalDownloads: Download[];
};

export default function DownloadStatus({
	mediaType,
	mediaId,
	initalDownloads,
}: DownloadStatusProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [downloads, setDownloads] = useState<Download[]>(initalDownloads);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isOpen) {
				//removed GetDownloads function from actions
				//const newDownloads = await GetDownloads(mediaType, mediaId);
				//setDownloads(newDownloads);
			}
		}, 10000);

		return () => clearInterval(interval);
	}, [isOpen, mediaType, mediaId]);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex h-fit w-full flex-row items-center justify-between px-4"
			>
				<div className="flex flex-row items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						className="h-[22px] w-[22px] stroke-system-blue-light dark:stroke-system-blue-dark"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>

					<p className="text-body">Download Progress</p>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2.5}
					stroke="currentColor"
					className="h-[17px] w-[17px]"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			</button>
			{isOpen && (
				<div className="pt-safe pb-nav fixed top-0 z-50 flex h-full max-h-full w-full flex-col overflow-hidden bg-system-primary-light px-4 py-3 dark:bg-system-primary-dark">
					<Header heading="Download Status" onBack={() => setIsOpen(false)} />
					<div className="no-scrollbar flex w-full flex-col items-center gap-[18px] overflow-auto pb-[9px]">
						{downloads?.map((download: Download, index: number) => (
							<Fragment key={index}>
								<div className="flex w-full flex-row items-center justify-between">
									<div className="flex w-full flex-col">
										<p className="w-full truncate text-left text-body">{download.episode?.title}</p>
										<p className="w-full truncate text-left text-subheadline   text-label-secondary-light dark:text-label-secondary-dark">
											S{download.episode?.seasonNumber}, E{download.episode?.episodeNumber} -{' '}
											{((1 - download.sizeLeft / download.size) * 100).toFixed(2)}% Complete
										</p>
										<p className="w-full truncate text-left text-subheadline text-label-secondary-light dark:text-label-secondary-dark"></p>
									</div>
									<div className="relative h-[24px] w-[24px] ">
										<svg className="h-full w-full" viewBox="0 0 100 100">
											<circle
												className="stroke-current text-fill-tetiary-light dark:text-fill-tetiary-dark"
												strokeWidth="10"
												cx="50"
												cy="50"
												r="40"
												fill="transparent"
											></circle>

											<circle
												className="progress-ring__circle  stroke-current text-system-blue-light dark:text-system-blue-dark"
												strokeWidth="10"
												strokeLinecap="round"
												cx="50"
												cy="50"
												r="40"
												fill="transparent"
												strokeDashoffset={`calc(400 - (400 * ${(
													(1 - download.sizeLeft / download.size) *
													60
												).toFixed(2)}) / 100)`}
											></circle>
										</svg>
									</div>
								</div>
								{index !== downloads.length - 1 && <Seperator />}
							</Fragment>
						))}
					</div>
				</div>
			)}
		</>
	);
}
