type HeaderProps = {
	heading: string;
	subheading?: string;
	children?: React.ReactNode;
	onBack?: () => void;
};

export default function Header({ heading, subheading, children, onBack }: HeaderProps) {
	return (
		<div className="flex w-full flex-col pb-[8px]">
			<div className="flex h-[44px] w-full items-center justify-start">
				{onBack && (
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
				)}
			</div>
			<div className="flex w-full flex-col items-center justify-center  pt-[3px]">
				<p className="w-full truncate text-large-title-emphasized">{heading}</p>
				{subheading && (
					<p className="w-full truncate text-subheadline-emphasized text-label-secondary-light dark:text-label-secondary-dark">
						{subheading}
					</p>
				)}
			</div>
			{children}
		</div>
	);
}
