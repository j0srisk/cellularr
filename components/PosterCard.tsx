'use client';

import { posterUrl, MediaType } from '@/app/types';
import Card from '@/components/Card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type PosterProps = {
	id: number;
	title: string;
	posterPath?: string | null;
	mediaType: MediaType.MOVIE | MediaType.TV;
	className?: string;
	href?: string;
	onClick?: () => void;
};

export default function PosterCard({
	id,
	title,
	posterPath,
	mediaType,
	className,
	href,
	onClick,
}: PosterProps) {
	const router = useRouter();

	if (typeof onClick === 'undefined') {
		onClick = () => router.push('/' + mediaType + '/' + id);
	}

	return (
		<Card
			className={twMerge([
				'shadow-drop-xs group relative flex aspect-[1/1.5] w-full flex-shrink-0 flex-grow-0 items-center justify-center border-none  hover:cursor-pointer',
				className,
			])}
			href={href}
			onClick={onClick}
		>
			{posterPath ? (
				<Image
					src={posterUrl + posterPath}
					alt={title}
					fill={true}
					sizes="33vw"
					className="object-cover"
				/>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					className="aspect-square w-1/2 stroke-label-secondary-dark"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
					/>
				</svg>
			)}
		</Card>
	);
}
