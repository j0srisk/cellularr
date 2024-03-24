import { useTransition } from '@/components/Common/TransitionRoot';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function Card({
	className,
	children,
	href,
	onClick,
}: {
	className?: string;
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
}) {
	const { navigateWithTransition } = useTransition();
	const router = useRouter();

	const handleOnClick = () => {
		//transition navigation
		navigateWithTransition(href!);
		//regular navigation
		//router.push(href!);
	};

	return (
		<div
			className={twMerge([
				`relative flex flex-col overflow-hidden rounded-[13px] border border-fill-tetiary-light bg-system-secondary-light dark:border-fill-tetiary-dark dark:bg-system-secondary-dark`,
				className,
			])}
			onClick={href ? handleOnClick : onClick}
		>
			{children}
		</div>
	);
}
