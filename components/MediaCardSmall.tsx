import Image from 'next/image';
import Link from 'next/link';

type MediaCardCompactProps = {
	className?: string;
	heading?: string;
	title: string;
	detailsArray?: string[];
	imageUrl?: string;
	durationText?: string;
	progress?: number;
	iconUrl?: string | null;
	viewWidth?: number;
	href?: string;
	children?: React.ReactNode;
};

export default function MediaCardSmall({
	className,
	heading,
	title,
	detailsArray,
	imageUrl,
	durationText,
	progress,
	iconUrl,
	viewWidth,
	href,
	children,
}: MediaCardCompactProps) {
	return (
		<Link
			href={href ? href : ''}
			className={`flex flex-shrink-0 snap-start scroll-ml-4 flex-col gap-1 ${className}`}
		>
			<div className="relative aspect-video overflow-hidden rounded-lg">
				{progress || durationText || iconUrl ? (
					<div className="absolute inset-0 flex h-full w-full items-end bg-gradient-to-t from-black/30 p-2">
						<div className="flex h-8 w-full gap-4">
							<div className="flex h-full w-full flex-col justify-between">
								<p className="w-full truncate text-body-emphasized uppercase text-label-secondary-dark">
									{durationText}
								</p>
								{progress && (
									<div className="flex h-1 w-full rounded-full bg-label-tetiary-dark">
										<div
											style={{ width: `${progress}%` }}
											className="h-full rounded-full bg-system-orange-light dark:bg-system-orange-dark"
										></div>
									</div>
								)}
							</div>
							{iconUrl && <img src={iconUrl} alt="icon" className="h-8 w-8 rounded-[10px]" />}
						</div>
					</div>
				) : null}
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={title}
						width={500}
						height={500}
						className="h-full w-full object-cover object-center"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-900 text-label-secondary-dark">
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
			{title && (
				<div className="flex w-full flex-col items-start justify-center">
					<p className="w-full truncate text-left text-footnote-emphasized uppercase text-label-secondary-light dark:text-label-secondary-dark">
						{heading}
					</p>
					<p className="w-full truncate text-left text-body">{title}</p>
					<p className="w-full truncate text-left text-subheadline text-label-secondary-light dark:text-label-secondary-dark">
						{detailsArray?.map((value, index) => (
							<span key={index}>
								{value}
								{detailsArray[index + 1] !== '' && index !== detailsArray.length - 1 && ' • '}
							</span>
						))}
					</p>
					{children}
				</div>
			)}
		</Link>
	);
}
