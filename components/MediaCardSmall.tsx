import Image from 'next/image';
import Link from 'next/link';

type MediaCardCompactProps = {
	title: string;
	subtitle?: string;
	imageUrl?: string | null;
	url: string;
	viewWidth?: number;
};

export default function MediaCardSmall({
	title,
	subtitle,
	imageUrl,
	url,
	viewWidth,
}: MediaCardCompactProps) {
	return (
		<Link
			style={{ width: `calc(${viewWidth ? viewWidth : 50}vw - 22px)` }}
			href={url}
			className="flex flex-shrink-0 snap-start scroll-ml-4 flex-col gap-1"
		>
			<div className="aspect-video overflow-hidden rounded-lg">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={title}
						width={300}
						height={300}
						className="h-full w-full object-cover object-center"
					/>
				) : (
					<div className="text-off-white flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-900">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-8 w-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							/>
						</svg>
					</div>
				)}
			</div>
			<div className="flex w-full flex-col">
				<p className="w-full truncate text-sm font-medium text-white">{title}</p>
				<p className="w-full truncate text-xs font-medium text-neutral-400">{subtitle}</p>
			</div>
		</Link>
	);
}
