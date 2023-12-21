'use client';

import { Download } from '@/app/types';
import { fetcher } from '@/app/utils';
import DownloadCard from '@/components/DownloadCard';
import Header from '@/components/Header';
import { useState } from 'react';
import useSWR from 'swr';

export default function Page() {
	const [downloads, setDownloads] = useState<Download[]>([]);

	const { data, error } = useSWR('/api/deluge', fetcher, {
		refreshInterval: 5000,
		onSuccess: (data) => {
			setDownloads(data);
		},
	});

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header heading="Downloads" subheading={downloads.length + ' Active Downloads'} />
			<div className="flex h-full w-full flex-col justify-start gap-2 overflow-auto pb-2">
				{downloads.map((download) => (
					<div key={download.name}>
						<DownloadCard key={download.id} download={download} />
					</div>
				))}
			</div>
		</div>
	);
}
