import { Download } from '@/app/types';
import { formatDuration, formatDurationSeconds } from '@/app/utils';
import Card from '@/components/Common/Card';

export default function DownloadCard({ download }: { download: Download }) {
	return (
		<Card key={download.name} className="flex w-full gap-3 p-4 shadow-drop-sm">
			<div className="flex w-full flex-col">
				<p className="w-full truncate text-start text-title-2-emphasized">{download.name}</p>
				<p className="truncate text-footnote text-label-secondary-light dark:text-label-secondary-dark">
					{download.size / 1024 / 1024 > 1024
						? (download.size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
						: (download.size / 1024 / 1024).toFixed(2) + ' MB'}
					{' • '}
					{download.client.name}
				</p>
			</div>
			<div className="flex w-full flex-col gap-2">
				<div className="flex w-full items-end justify-between">
					<p className="truncate text-title-2-emphasized text-system-blue-light dark:text-system-blue-dark">
						{download.progress.toFixed(2)}%
					</p>
					<p className="truncate text-body-emphasized text-label-secondary-light dark:text-label-secondary-dark">
						{download.state}
					</p>
				</div>
				<div className="relative h-1.5 w-full overflow-hidden rounded-sm bg-fill-tetiary-light dark:bg-fill-tetiary-dark">
					<div
						style={{ width: download.progress + '%' }}
						className="absolute h-full bg-system-blue-light dark:bg-system-blue-dark"
					></div>
				</div>
			</div>

			<div className="flex w-full items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					{download.state === 'Downloading' && (
						<div className="flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5 stroke-label-secondary-light dark:stroke-label-secondary-dark"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
								/>
							</svg>
							<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
								{(download.downloadSpeed / 1024 / 1024).toFixed(2)} MB/s
							</p>
						</div>
					)}
					{download.uploadSpeed !== undefined && download.state === 'Seeding' && (
						<div className="flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5 stroke-label-secondary-light dark:stroke-label-secondary-dark"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
								/>
							</svg>

							<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
								{(download.uploadSpeed / 1024 / 1024).toFixed(2)} MB/s
							</p>
						</div>
					)}
					{download.remaining !== 0 && download.state === 'Downloading' && (
						<div className="flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5 stroke-label-secondary-light dark:stroke-label-secondary-dark"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>

							<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
								{formatDurationSeconds(Math.round(download.eta / 1000))}
							</p>
						</div>
					)}
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.75}
					stroke="currentColor"
					className="hidden h-7 w-7 stroke-label-secondary-light dark:stroke-label-secondary-dark"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
				<p className="text-footnote-emphasized tracking-tight text-system-blue-light dark:text-system-blue-dark">
					See Details
				</p>
			</div>
		</Card>
	);
}
