type SearchBarProps = {
	value: string | '';
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
	clearFunction?: () => void;
};

export default function SearchBar({ value, onChange, onBlur, clearFunction }: SearchBarProps) {
	return (
		<div className="flex h-9 w-full flex-shrink-0 items-center gap-2 rounded-lg bg-fill-tetiary-light px-2 dark:bg-fill-tetiary-dark">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={2.5}
				stroke="currentColor"
				className="h-4 w-4 flex-shrink-0 stroke-label-secondary-light dark:stroke-label-secondary-dark"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>

			<input
				type="text"
				placeholder="Search Movies & TV"
				value={value}
				onChange={onChange}
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						(e.target as HTMLInputElement).blur();
					}
				}}
				onBlur={onBlur}
				className="text-label-primary h-full w-full bg-transparent text-body placeholder-label-secondary-light outline-none dark:placeholder-label-secondary-dark"
			/>
			{value && (
				<button className="h-[22px] w-[22px]" onClick={clearFunction}>
					<div className="flex aspect-square items-center justify-center rounded-full bg-fill-tetiary-light text-label-secondary-light dark:bg-fill-tetiary-dark dark:text-label-secondary-dark">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className="h-3 w-3"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</div>
				</button>
			)}
		</div>
	);
}
