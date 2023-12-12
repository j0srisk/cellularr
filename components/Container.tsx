import Link from 'next/link';

export default function Container({
	name,
	icon,
	url,
}: {
	name: string;
	icon?: string | null | undefined;
	url: string;
}) {
	const iconUrl = icon
		? icon
		: `https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/${name.toLowerCase()}.svg`;

	return (
		<Link
			href={url}
			className="relative flex h-full w-full items-center justify-start gap-2 bg-black py-4"
		>
			<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-neutral-400 p-2">
				<img src={iconUrl} alt="icon" className="" />
			</div>
			<div className="flex w-full flex-col truncate">
				<p className="w-full truncate text-lg font-semibold text-white">{name}</p>
				<p className="w-full truncate text-xs font-semibold text-neutral-400">{url}</p>
			</div>
			<div className="flex-shrink-0 rounded-full bg-zinc-800 px-4 py-1">
				<p className="text-sm font-black text-blue-500">Running</p>
			</div>
		</Link>
	);
}
