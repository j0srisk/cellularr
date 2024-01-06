import Image from 'next/image';

type MediaCardLandscapeProps = {
	imageUrl?: string;
	title?: string;
	details?: string;
	className?: string;
	children?: React.ReactNode;
};

export default function MediaCardLandscape({
	imageUrl,
	title,
	details,
	className,
	children,
}: MediaCardLandscapeProps) {
	return (
		<div className={`flex w-full snap-start items-center gap-4 ${className}`}>
			<div className="relative flex aspect-[2/3] h-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border-0 border-separator-opaque-light bg-gradient-to-tr from-zinc-800 to-zinc-900 text-label-secondary-dark dark:border-separator-opaque-dark">
				{imageUrl ? (
					<>
						<Image
							src={imageUrl}
							height={300}
							width={200}
							alt={title || 'Media Card Landscape'}
							className="absolute h-full w-full object-cover object-center"
						/>
					</>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						className="h-4 w-4 stroke-label-secondary-dark"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>
				)}
			</div>

			<div className="flex w-full items-center gap-[-4px] truncate">
				<div className="flex w-full flex-col items-start justify-center">
					<p className="font-body w-full truncate text-left text-body text-label-primary-light dark:text-label-primary-dark">
						{title}
					</p>
					<p className="w-full truncate text-left text-subheadline text-label-secondary-light dark:text-label-secondary-dark">
						{details}
					</p>
				</div>
				{children}
			</div>
		</div>
	);
}
