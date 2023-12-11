import { StateEnum } from '@/enums';

export default function SessionCard({
	poster,
	backdrop,
	title,
	year,
	user,
	state,
}: {
	poster: string;
	backdrop: string;
	title: string;
	year: string;
	user: string;
	state: StateEnum;
}) {
	return (
		<div
			style={
				{
					'--image-url': `url(${backdrop})`,
				} as React.CSSProperties
			}
			className=" w-1/2 rounded-md bg-[image:var(--image-url)] bg-cover bg-center"
		>
			<div className="flex h-full w-full flex-col gap-2 rounded-md p-2 backdrop-blur-lg">
				<div className="flex w-full gap-4">
					<img src={poster} alt="Picture of the author" className="h-24 rounded-md shadow-lg" />
					<div className="flex w-full flex-col items-start justify-center">
						<p className="text-center font-bold text-white">{title}</p>
						<p className="text-center text-white">{year}</p>
						<div className="flex items-center gap-2">
							<p className="text-center text-white">{user}</p>
							<p className="text-center text-xs font-bold text-green-500">Direct Play</p>
						</div>
					</div>
				</div>
				<div className="relative flex h-6 w-full items-center justify-between rounded-md bg-neutral-800 px-1 text-white ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="z-10 w-5"
					>
						<path
							fillRule="evenodd"
							d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
							clipRule="evenodd"
						/>
					</svg>
					<div className="z-10 flex gap-1">
						<p className="text-sm text-white">0:00</p>
						<p className="text-sm text-white">/</p>
						<p className="text-sm text-white">2:30</p>
					</div>

					<div className="absolute left-0 top-0 h-6 w-1/2 rounded-md bg-amber-500"></div>
				</div>
			</div>
		</div>
	);
}
