import { Download } from '@/app/types';

export default function DownloadCard({ download }: { download: Download }) {
	const progress = ((download.sizeLeft / download.size) * 100).toFixed(2);
	return (
		<div className="relative flex h-full w-full flex-col items-start gap-4 rounded-xl bg-zinc-500/30 p-4">
			<p className="font-semibold ">{download.name}</p>
			<div className="h-2 w-full overflow-hidden rounded-sm bg-zinc-700/30">
				<div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
			</div>
			<div className="flex w-full justify-between">
				<div className="flex gap-1">
					<p className="text-xs font-semibold opacity-60">{download.status}</p>
					<p className="text-xs font-semibold opacity-60">{progress}%</p>
				</div>
			</div>
		</div>
	);
}
