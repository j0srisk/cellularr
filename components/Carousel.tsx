import { twMerge } from 'tailwind-merge';

export default function Carousel({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={twMerge('no-scrollbar flex w-full gap-2 overflow-x-auto', className)}>
			{children}
		</div>
	);
}
