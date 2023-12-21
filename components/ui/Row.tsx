type RowProps = {
	title: string;
	detail?: string;
	className?: string;
};

export default function Row({ title, detail, className }: RowProps) {
	return (
		<div className="flex h-[44px] w-full items-center justify-between px-4">
			<p className="text-body text-label-primary-light dark:text-label-primary-dark">{title}</p>
			<div className="text-label-secondary-light dark:text-label-secondary-dark flex items-center justify-center gap-2">
				<p className="text-body">{detail}</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2.5}
					stroke="currentColor"
					className="h-[17px] w-[17px]"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			</div>
		</div>
	);
}
