import { twMerge } from 'tailwind-merge';

export default function Card({
	className,
	children,
	onClick,
}: {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<div
			className={twMerge([
				'flex flex-col overflow-hidden rounded-xl border border-fill-tetiary-light bg-fill-tetiary-light shadow-sm dark:border-fill-tetiary-dark dark:bg-fill-tetiary-dark',
				className,
			])}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
