import { posterUrl } from '@/app/typess';
import Card from '@/components/Card';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type PersonCardProps = {
	name: string;
	character?: string;
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
				<div className="flex aspect-square w-2/3 items-center justify-center overflow-hidden rounded-full">
					{profilePath ? (
						<Image
							src={posterUrl + profilePath}
							alt={name}
							height={300}
							width={300}
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
