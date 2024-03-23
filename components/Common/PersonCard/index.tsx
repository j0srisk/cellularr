import { posterUrl } from '@/app/types';
import Card from '@/components/Common/Card';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type PersonCardProps = {
	name: string;
	character?: string | null;
	className?: string;
	imageURL?: string;
	profilePath: string | null;
	onClick?: () => void;
};

export default function PersonCard({
	name,
	character,
	profilePath,
	className,
	onClick,
}: PersonCardProps) {
	return (
		<Card
			className={twMerge(['flex aspect-[1/1.5] w-full flex-shrink-0 flex-grow-0', className])}
			onClick={onClick}
		>
			<div className="flex aspect-square w-full items-center justify-center">
				<div className="flex aspect-square w-2/3 items-center justify-center overflow-hidden rounded-full border border-fill-tetiary-light dark:border-fill-tetiary-dark">
					{profilePath ? (
						<Image
							src={posterUrl + profilePath}
							alt={name}
							height={300}
							width={300}
							className=" object-cover"
							priority={true}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-label-secondary-light p-2 dark:bg-label-secondary-dark">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-full w-full fill-system-secondary-light dark:fill-system-secondary-dark"
							>
								<path
									fillRule="evenodd"
									d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
				</div>
			</div>
			{
				// TODO: Account for longer character names
			}
			<div className="flex w-full flex-col items-center gap-1 px-2">
				<p className="w-full truncate text-center text-subheadline-emphasized">{name}</p>
				{character && (
					<p className="w-full truncate text-center text-subheadline text-label-secondary-light dark:text-label-secondary-dark">
						{character}
					</p>
				)}
			</div>
		</Card>
	);
}
