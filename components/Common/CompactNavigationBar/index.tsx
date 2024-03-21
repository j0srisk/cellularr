export default function CompactNavigationBar({ title }: { title: string }) {
	return (
		<div className="pt-safe bg-nav fixed top-0 z-40 flex w-full items-center justify-center">
			<div className="flex h-[44px] items-center justify-center">
				<p className="pb-1 text-body-emphasized">{title}</p>
			</div>
		</div>
	);
}
