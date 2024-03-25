'use client';

import { getDownloads } from '@/app/actions';
import Card from '@/components/Common/Card';
import NavigationBar from '@/components/Common/NavigationBar';
import Section from '@/components/Common/Section';
import DownloadCard from '@/components/Downloads/DownloadCard';
import useSWR from 'swr';

export default function DownloadsPage() {
	const { data: downloads } = useSWR('download-clients', getDownloads, {
		refreshInterval: 5000,
	});

	let downloadCount = 0;
	if (downloads) {
		downloads.forEach((download) => {
			if (download.state === 'Downloading') {
				downloadCount++;
			}
		});
	}

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<NavigationBar title="Downloads" subtitle={downloadCount + ' active downloads'} />
			<div className="pb-nav-4 flex h-fit w-full flex-col gap-4 px-4 pt-0">
				{downloads && downloads.length > 0 && (
					<>
						{downloads.map((download) => (
							<DownloadCard key={download.name} download={download} />
						))}
					</>
				)}
			</div>
		</div>
	);
}
