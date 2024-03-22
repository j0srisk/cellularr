import Card from '@/components/Common/Card';
import { genreColorMap } from '@/components/Search/constants';
import { Genre } from '@/services/overseerr/types/common';
import Image from 'next/image';

export default function GenreCard({
	name,
	genreId,
	backdropPath,
	href,
	onClick,
}: {
	name: string;
	genreId: number;
	backdropPath: string | null;
	href?: string;
	onClick?: () => void;
}) {
	return (
		<Card
			className="shadow-drop-sm relative aspect-video w-full items-start justify-end border-none p-2 hover:cursor-pointer"
			href={href}
			onClick={onClick}
		>
			<p className="z-10 text-title-2-emphasized text-label-primary-dark">{name}</p>
			{genreId != -1 && (
				<>
					{backdropPath ? (
						<Image
							src={`https://image.tmdb.org/t/p/w1280_filter(duotone,${genreColorMap[genreId]})${backdropPath}`}
							alt={name}
							fill={true}
							className="absolute top-0 h-full w-full object-cover object-center"
						/>
					) : (
						<div
							className={`absolute top-0 h-full w-full bg-gradient-to-b from-${genreColorMap[genreId]} to-transparent`}
						/>
					)}
				</>
			)}
		</Card>
	);
}
