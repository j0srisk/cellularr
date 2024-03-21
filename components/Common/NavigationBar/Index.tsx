import { twMerge } from 'tailwind-merge';

type HeaderProps = {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
	onBack?: () => void;
};

export default function NavigationBar({
	title,
	subtitle,
	children,
	className,
	onBack,
}: HeaderProps) {
	return (
		<div
			className={twMerge(`pt-safe bg-nav sticky top-0 z-30 flex w-full flex-col px-4`, className)}
		>
			{onBack && (
				<div className="flex w-full items-center justify-start py-[11px]">
					<button
						onClick={onBack}
						className="bg-red flex flex-row items-center text-system-blue-light dark:text-system-blue-dark"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-[22px] w-[22px]"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
						</svg>

						<p className="text-body">Back</p>
					</button>
				</div>
			)}

			<div className="flex w-full flex-col items-center justify-center pb-[8px] pt-[3px]">
				<p className="w-full truncate text-large-title-emphasized">{title}</p>
				{subtitle && (
					<p className="w-full truncate text-subheadline-emphasized text-label-secondary-light dark:text-label-secondary-dark">
						{subtitle}
					</p>
				)}
			</div>
			{children}
		</div>
	);
}
