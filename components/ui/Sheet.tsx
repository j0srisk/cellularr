export default function Sheet({
	title,
	closeFunction,
	children,
}: {
	title: string;
	closeFunction: () => void;
	children: React.ReactNode;
}) {
	return (
		<div className="pt-safe fixed left-0 top-0 z-40 flex h-full w-full items-end">
			<div className="pb-safe bg-system-primary-light dark:bg-system-primary-dark-elevated flex max-h-full w-full flex-col gap-[18px] overflow-hidden rounded-t-[10px] px-4 py-3">
				<div className="flex items-center justify-between">
					<p className="text-title-3-emphasized text-label-primary-light dark:text-label-primary-dark">
						{title}
					</p>
					<button className="h-[30px] w-[30px]" onClick={closeFunction}>
						<div className="bg-fill-tetiary-light dark:bg-fill-tetiary-dark text-label-secondary-light dark:text-label-secondary-dark flex aspect-square items-center justify-center rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2.5}
								stroke="currentColor"
								className="h-5 w-5"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</div>
					</button>
				</div>
				<div className="pb-3">{children}</div>
			</div>
		</div>
	);
}
