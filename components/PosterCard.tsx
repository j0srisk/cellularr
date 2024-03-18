import Card from '@/components/Card';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type PosterProps = {
	title: string;
	year?: string;
	imageURL?: string;
	className?: string;
	onClick?: () => void;
};

export default function PosterCard({ title, year, imageURL, className, onClick }: PosterProps) {
	return (
		<Card
			className={twMerge([
				'group relative flex aspect-[1/1.5] w-full flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden rounded-xl hover:cursor-pointer',
				className,
			])}
			onClick={onClick}
		>
			<div className="absolute hidden h-full w-full flex-col justify-between gap-1 bg-black bg-opacity-75 p-2">
				<div className="flex flex-col gap-1">
					{year && <p className="text-subheadline">{year}</p>}
					<p className="text-body-emphasized">{title}</p>
				</div>
				<div className="flex justify-center rounded-md bg-system-indigo-light px-2 py-1 shadow-none dark:bg-system-indigo-dark">
					<p className="text-subheadline-emphasized text-label-primary-light dark:text-label-primary-dark">
						Request
					</p>
				</div>
			</div>
			{imageURL ? (
				<Image src={imageURL} alt={title} height={450} width={300} className="object-cover" />
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
