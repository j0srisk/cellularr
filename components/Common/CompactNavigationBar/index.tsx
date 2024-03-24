import { useRouter } from 'next/navigation';

export default function CompactNavigationBar({ title }: { title: string }) {
	const router = useRouter();
	return (
		<div className="pt-safe bg-nav fixed top-0 z-40 flex w-full items-center justify-center">
			<div className="flex h-[44px] w-full items-center justify-between">
				<div className="flex w-fit items-center justify-start py-[11px]">
					<button
						className="flex flex-shrink-0 flex-row items-center text-system-blue-light dark:text-system-blue-dark"
						onClick={() => router.back()}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-[22px] w-[22px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>

						<p className="text-body">Back</p>
					</button>
				</div>
				<div className="">
					<p className="text-center text-body-emphasized">{title}</p>
				</div>
				<div className="h-full w-[58px] flex-shrink-0" />
			</div>
		</div>
	);
}
