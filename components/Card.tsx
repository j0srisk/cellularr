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
	if (href && !onClick) {
		const router = useRouter();
		onClick = () => router.push(href);
	}

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
