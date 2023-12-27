import Link from 'next/link';

export default function Container({
	name,
	icon,
	url,
	backgroundColor,
}: {
	name: string;
	icon?: string | null;
	url: string;
	backgroundColor?: string;
}) {
	let iconUrl;

	if (icon?.endsWith('.svg')) {
		iconUrl = `https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/${icon}`;
	} else if (icon?.endsWith('.png')) {
		iconUrl = `https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/png/${icon}`;
	} else if (!icon) {
		iconUrl = `https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/${name.toLowerCase()}.svg`;
	}

	return (
		<Link href={url} className="relative flex h-full w-full items-center justify-start gap-4">
			<div
				style={{ backgroundColor: backgroundColor }}
				className="flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-[15px] bg-neutral-400 p-[6px]"
			>
				<img src={iconUrl} alt="icon" className="" />
			</div>
			<div className="flex w-full flex-col ">
				<p className="w-full truncate text-subheadline">{name}</p>
				<p className="w-full truncate text-footnote text-label-secondary-light dark:text-label-secondary-dark">
					{url}
				</p>
			</div>
			<div className="mr-4 h-[12px] w-[12px] flex-shrink-0 rounded-full bg-system-green-dark"></div>
		</Link>
	);
}
