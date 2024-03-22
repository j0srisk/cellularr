import GenreCard from '../GenreCard';
import { MediaType } from '@/app/types';
import { Genre } from '@/services/overseerr/types/common';
import { useState } from 'react';

export default function Genres({
	genres,
	mediaType,
}: {
	genres: Genre[];
	mediaType: MediaType.MOVIE | MediaType.TV;
}) {
	const [moreGenres, setMoreGenres] = useState(false);

	return (
		<div className="grid w-full grid-cols-2 gap-2">
			{genres.slice(0, moreGenres ? genres.length : 20).map((genre: Genre) => (
				<GenreCard
					key={genre.id}
					name={genre.name}
					genreId={genre.id}
					backdropPath={genre.backdrops?.[4] || null}
					href={`/discover/${mediaType}${mediaType === MediaType.MOVIE ? 's' : ''}?genre=${
						genre.id
					}`}
				/>
			))}
			{genres.length > 20 && (
				<GenreCard
					key={-1}
					name={'Show ' + (moreGenres ? 'Less' : 'More')}
					genreId={-1}
					backdropPath=""
					onClick={() => setMoreGenres(!moreGenres)}
				/>
			)}
		</div>
	);
}
