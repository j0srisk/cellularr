type HeaderProps = {
	heading: string;
	subheading?: string;
	children?: React.ReactNode;
};

export default function Header({ heading, subheading, children }: HeaderProps) {
	return (
		<div className="flex w-full flex-col gap-[9px] pb-[9px] pt-5">
			<div className="flex w-full flex-col items-center justify-center">
				<p className="text-large-title-emphasized text-label-primary-dark w-full truncate">
					{heading}
				</p>
				{subheading && (
					<p className="text-label-secondary-dark text-subheadline-emphasized w-full truncate">
						{subheading}
					</p>
				)}
			</div>
			{children}
		</div>
	);
}
