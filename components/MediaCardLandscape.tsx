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
			<div className="border-separator-opaque-light dark:border-separator-opaque-dark aspect-[2/3] h-16 flex-shrink-0 overflow-hidden rounded-md border-0">
				{imageUrl ? (
					<Image
						src={imageUrl}
						height={300}
						width={200}
						alt={title || 'Media Card Landscape'}
						className="h-full w-full object-cover object-center"
					/>
				) : (
					<div className="text-label-secondary-dark flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-900">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-4 w-4"
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

			<div className="flex w-full items-center gap-[-4px]">
				<div className="flex w-full flex-col items-start justify-center truncate">
					<p className="font-body text-label-primary-light dark:text-label-primary-dark text-body w-full truncate text-left">
						{title}
					</p>
					<p className="text-label-secondary-light dark:text-label-secondary-dark text-subheadline w-full truncate text-left">
						{details}
					</p>
				</div>
				{children}
			</div>
		</div>
	);
}
