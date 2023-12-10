import Link from 'next/link';

export default function App({ icon, url, name }: { icon: string; url: string; name: string }) {
	return (
		<Link
			href={url}
			className="flex w-full flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-neutral-800 bg-zinc-800/30 p-4"
		>
			<img src={icon} alt="icon" className="h-24 rounded-full" />
			<p className="text-center font-bold text-white">{name}</p>
		</Link>
	);
}
