import HardDrive from '@/components/HardDrive';

export default function Array() {
	return (
		<div className="flex h-full w-full flex-col items-center gap-2 overflow-auto rounded-lg border border-neutral-800 bg-zinc-800/30 p-4">
			<div className="flex w-full items-center justify-between gap-2">
				<p className="text-xl font-bold">Array</p>
				<p className="text-xs">27.1 TB used of 28 TB</p>
			</div>
			<HardDrive device="Disk 1" utilization={97} />
			<HardDrive device="Disk 2" utilization={98} />
			<HardDrive device="Disk 3" utilization={97} />
			<HardDrive device="Disk 4" utilization={96} />
			<HardDrive device="Disk 5" utilization={98} />
			<HardDrive device="Disk 6" utilization={97} />
			<HardDrive device="Disk 7" utilization={94} />
			<div className="flex w-full items-center justify-between gap-2">
				<p className="text-xl font-bold">Cache</p>
				<p className="text-xs">110 GB of 240 GB</p>
			</div>
			<HardDrive device="Cache" utilization={46} />
		</div>
	);
}
