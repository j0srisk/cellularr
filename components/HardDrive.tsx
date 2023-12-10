export default function HardDrive({
	device,
	utilization,
}: {
	device: string;
	utilization: number;
}) {
	return (
		<div className="relative flex h-6 w-full items-center justify-between overflow-hidden rounded-md bg-neutral-800 px-1 text-white ">
			<div className="z-20 flex w-full items-center justify-between gap-1">
				<p className="text-xs font-bold text-white">{device}</p>
				<p className="text-xs font-bold text-white">{utilization}%</p>
			</div>

			<div
				style={{
					width: `${utilization}%`,
				}}
				className="absolute left-0 top-0 z-10 h-6 bg-green-500"
			/>
		</div>
	);
}
