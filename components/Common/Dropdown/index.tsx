import Card from '@/components/Common/Card';

type DropdownProps = {
	valueText?: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	options: React.ReactNode;
};

export default function Dropdown({ value, valueText = value, onChange, options }: DropdownProps) {
	return (
		<div className="relative">
			<Card className="w-full flex-row items-center justify-between rounded-lg bg-system-tertiary-light p-3 py-2.5 dark:bg-system-tertiary-dark">
				<p className="text-body">{valueText}</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					className="h-4 w-4 stroke-label-secondary-light dark:stroke-label-secondary-dark"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
				</svg>
			</Card>
			<select
				className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				value={value}
				onChange={onChange}
			>
				{options}
			</select>
		</div>
	);
}
