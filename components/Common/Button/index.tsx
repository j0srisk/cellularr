import Card from '@/components/Common/Card';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function Button({
	className,
	children,
	disabled,
	href,
	onClick,
}: {
	className?: string;
	children: React.ReactNode;
	disabled?: boolean;
	href?: string;
	onClick?: () => void;
}) {
	const router = useRouter();

	if (href && !onClick) {
		onClick = () => router.push(href);
	}

	return (
		<Card
			className={twMerge([
				`flex-row items-center justify-center rounded-lg p-2.5 px-5 shadow-none hover:cursor-pointer ${
					disabled ? 'opacity-50 hover:cursor-auto' : 'opacity-100'
				}`,
				className,
			])}
			onClick={disabled ? undefined : onClick}
		>
			{children}
		</Card>
	);
}
