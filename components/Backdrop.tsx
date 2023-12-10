export default function Backdrop({ url, children }: { url?: string; children: React.ReactNode }) {
	return (
		<div
			style={
				{
					'--image-url': `url(${url})`,
				} as React.CSSProperties
			}
			className="h-fit w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-500/30 bg-[image:var(--image-url)] bg-cover bg-center"
		>
			<div className="flex h-full w-full flex-col gap-4 bg-black bg-opacity-25 p-4 backdrop-blur-xl">
				{children}
			</div>
		</div>
	);
}
