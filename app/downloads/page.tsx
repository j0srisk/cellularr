'use client';

import { Download } from '@/app/types';
import DownloadCard from '@/components/DownloadCard';
import { useState } from 'react';
import useSWR from 'swr';

export default function Page() {
	const [downloads, setDownloads] = useState<Download[]>([]);
	const fetcher = (...args: any[]) =>
		fetch(...args, { method: 'GET', cache: 'no-store' }).then((res) => res.json());

	const { data, error } = useSWR('/api/downloads', fetcher, {
		refreshInterval: 5000,
		onSuccess: (data) => {
			setDownloads(data);
		},
	});

	return (
		<div>
			<p>Downloads</p>
			{downloads.map((download) => (
				<div key={download.name}>
					<DownloadCard key={download.id} download={download} />
				</div>
			))}
		</div>
	);
}
