import Link from 'next/link';

export default function Container({
	name,
	icon,
	url,
}: {
	name: string;
	icon: string;
	url: string;
}) {
	return (
		<Link
			href={url}
			className="relative flex h-full w-full items-center justify-start gap-4 rounded-xl bg-zinc-500/30 p-4 "
		>
			<div className="flex h-14 w-14  items-center justify-center rounded-xl">
				<img src={icon} alt="icon" className="" />
			</div>
			<p className="text-center text-2xl font-semibold text-white">{name}</p>
			<div className="absolute right-2 top-2 h-3 w-3 rounded-full bg-green-500" />
			<div className="absolute right-2 top-2 z-20 hidden rounded-md bg-green-500 p-1 px-2">
				<p className="text-xs font-bold">Running</p>
			</div>
		</Link>
	);
}
