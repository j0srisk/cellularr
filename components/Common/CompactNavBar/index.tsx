export default function CompactNavBar({ title }: { title: string }) {
	return (
		<div className="pt-safe fixed top-0 z-40 flex  w-full items-center justify-center bg-system-primary-light/75 bg-blend-hard-light backdrop-blur-[25px] dark:bg-system-primary-dark/75">
			<div className="flex h-[44px] items-center justify-center">
				<p className="pb-1 text-body-emphasized">{title}</p>
			</div>
		</div>
	);
}
