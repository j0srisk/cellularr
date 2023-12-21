type GroupListProps = {
	header?: string;
	footer?: string;
	children: React.ReactNode;
};

export default function GroupList({ header, footer, children }: GroupListProps) {
	return (
		<div className="w-full">
			{header && (
				<p className="text-heading text-label-secondary-light dark:text-label-secondary-dark mb-[7px] px-4 uppercase">
					{header}
				</p>
			)}
			<div className="bg-system-secondary-light dark:bg-system-secondary-dark-elevated flex h-fit flex-col items-center justify-center overflow-hidden rounded-[10px]">
				{children}
			</div>
			{footer && (
				<p className="text-heading text-label-secondary-light dark:text-label-secondary-dark px-4 pt-[5px]">
					{footer}
				</p>
			)}
		</div>
	);
}
