import { twMerge } from 'tailwind-merge';

export default function SystemBackground({
	className,
	children,
}: {
	className: string;
	children: React.ReactNode;
}) {
	return (
		<div className={twMerge(['bg-system-primary-light dark:bg-system-primary-dark', className])}>
			{children}
		</div>
	);
}
