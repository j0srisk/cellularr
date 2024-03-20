import Card from '@/components/Card';
import { genreColorMap } from '@/components/Discover/constants';
import { Genre } from '@/services/overseerr/types/common';
import Image from 'next/image';

export default function GenreCard({
	genre,
	href,
	onClick,
}: {
	genre: Genre;
	href?: string;
	onClick?: () => void;
}) {
	return (
		<Card
			key={genre.id}
			className="relative aspect-video items-start justify-end p-2 hover:cursor-pointer"
			href={href}
			onClick={onClick}
		>
			<p className="text-title-2-emphasized z-10 text-label-primary-dark">{genre.name}</p>
			{genre.id != -1 && (
				<Image
					src={`https://image.tmdb.org/t/p/w1280_filter(duotone,${genreColorMap[genre.id]})${
						genre.backdrops[4]
					}`}
					alt={genre.name}
					fill={true}
					className="absolute top-0 h-full w-full object-cover object-center"
				/>
			)}
		</Card>
	);
}
