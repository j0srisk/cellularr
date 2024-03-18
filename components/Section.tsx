import { twMerge } from 'tailwind-merge';

export default function Section({
	className,
	heading,
	children,
}: {
	className?: string;
	heading?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={twMerge(['flex flex-col gap-3', className])}>
			{heading && <p className="px-4 text-title-3-emphasized">{heading}</p>}
			{children}
		</div>
	);
}
