type HeaderProps = {
	heading: string;
	subheading?: string;
	children?: React.ReactNode;
};

export default function Header({ heading, subheading, children }: HeaderProps) {
	return (
		<div className="flex w-full flex-col gap-[9px] pb-[9px] pt-5">
			<div className="flex w-full flex-col items-center justify-center">
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
