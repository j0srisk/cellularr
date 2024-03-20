import Card from '@/components/Card';
import { twMerge } from 'tailwind-merge';

export default function Button({
	className,
	children,
	onClick,
}: {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Card
			className={twMerge([
				'flex-row items-center justify-center rounded-lg p-2.5 px-5 shadow-none hover:cursor-pointer',
				className,
			])}
			onClick={onClick}
		>
			{children}
		</Card>
	);
}
