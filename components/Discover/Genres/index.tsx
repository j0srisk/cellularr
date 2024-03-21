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
		<div className="flex flex-col gap-3">
			<p className="text-title-3-emphasized">
				Browse {mediaType === MediaType.MOVIE ? 'Movies' : 'Series'}
			</p>
			<div className="grid grid-cols-2 gap-2">
				{genres.slice(0, moreGenres ? genres.length : 5).map((genre: Genre) => (
					<GenreCard
						key={genre.id}
						genre={genre}
						href={`/discover/${mediaType}${mediaType === MediaType.MOVIE ? 's' : ''}?genre=${
							genre.id
						}`}
					/>
				))}
				{genres.length > 5 && (
					<GenreCard
						genre={{
							id: -1,
							name: 'Show ' + (moreGenres ? 'Less' : 'More'),
							backdrops: [],
						}}
						onClick={() => setMoreGenres(!moreGenres)}
					/>
				)}
			</div>
		</div>
	);
}
