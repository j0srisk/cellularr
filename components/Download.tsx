function formatDuration(seconds: number) {
	let minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	let hours = Math.floor(minutes / 60);
	minutes = minutes % 60;

	return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
}

function formatSize(size: number) {
	if (size < 1024) {
		return `${size} MB`;
	} else {
		const gbSize = size / 1024;
		return `${gbSize.toFixed(1)} GB`;
	}
}

export default function Download({
	name,
	total_size_mb,
	eta,
	progress,
	state,
}: {
	name: string;
	total_size_mb: number;
	eta: number;
	progress: number;
	state: string;
}) {
	return (
		<div className="flex w-full">
			<div className="flex flex-1 items-center truncate">
				<p className="truncate text-sm">{name}</p>
			</div>
			<div className="relative flex h-6 w-16 items-center justify-center">
				<p className="text-xs text-white">{formatSize(total_size_mb)}</p>
			</div>
			<div className="relative flex h-6 w-24 items-center justify-center">
				{state === 'Downloading' && <p className="text-xs text-white">{eta}</p>}
				{state === 'Paused' && <p className="text-xs text-white">Paused</p>}
			</div>
			<div className="relative flex h-6 w-48 items-center justify-center overflow-hidden rounded-md bg-neutral-800 text-white ">
				<p className="z-20 text-xs font-bold text-white">{progress}%</p>

				<div
					style={{
						width: `${progress}%`,
					}}
					className="absolute left-0 top-0 z-10 h-6 bg-blue-500"
				/>
			</div>
		</div>
	);
}
