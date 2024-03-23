import { MediaType } from '@/app/types';
import Card from '@/components/Common/Card';
import PosterCard from '@/components/Common/PosterCard';
import Separator from '@/components/Common/Separator';
import ToggleButton from '@/components/Common/Toggle';
import { MediaStatus } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { MovieResult } from '@/services/overseerr/types/search';
import { Fragment, useEffect } from 'react';

export default function MovieSelector({
	setSelectedMovies,
	selectedMovies,
	movies,
}: {
	setSelectedMovies: React.Dispatch<React.SetStateAction<(MovieResult | MovieDetails)[]>>;
	selectedMovies: (MovieResult | MovieDetails)[];
	movies: (MovieResult | MovieDetails)[];
}) {
	const unrequestedMovies = movies.filter((movie) => !movie.mediaInfo);

	const handleSelectAllMovies = () => {
		if (selectedMovies.length === unrequestedMovies.length) {
			setSelectedMovies([]);
		} else {
			setSelectedMovies(unrequestedMovies);
		}
	};

	useEffect(() => {
		if (movies.length === 1 && unrequestedMovies.length === 1) {
			console.log('single movie', movies);
			setSelectedMovies(movies);
		}
	}, []);

	return (
		<Card className="flex w-full flex-col rounded-lg bg-system-tertiary-light dark:bg-system-tertiary-dark">
			{movies.length > 1 && (
				<div className="flex w-full flex-col items-center">
					<div className="flex w-full items-center justify-between gap-2 p-3 py-2.5">
						<p className="text-body-emphasized">Select All</p>
						<p>{selectedMovies.length === unrequestedMovies.length ? 'true' : 'false'}</p>
						<ToggleButton
							toggled={selectedMovies.length === unrequestedMovies.length ? true : false}
							disabled={unrequestedMovies.length === 0}
							color="bg-system-indigo-light dark:bg-system-indigo-dark"
							onToggle={() => {
								handleSelectAllMovies();
							}}
						/>
					</div>
					<Separator />
				</div>
			)}
			{movies.map((movie, index) => (
				<Fragment key={movie.id}>
					<div className="flex w-full items-center gap-2 p-3 py-2.5">
						<PosterCard
							id={movie.id}
							posterPath={movie.posterPath}
							title={movie.title}
							mediaType={MediaType.MOVIE}
							className="w-16 rounded-md border-none"
						/>

						<div className="flex w-full flex-col">
							{movie.releaseDate && (
								<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
									{movie.releaseDate.split('-')[0]}
								</p>
							)}
							<p className="text-body-emphasized">{movie.title}</p>
						</div>
						<p>{selectedMovies.includes(movie) ? 'true' : 'false'}</p>
						{movies.length > 1 && (
							<ToggleButton
								toggled={selectedMovies.includes(movie) || movie.mediaInfo ? true : false}
								color={
									movie.mediaInfo?.status === MediaStatus.AVAILABLE
										? ''
										: 'bg-system-indigo-light dark:bg-system-indigo-dark'
								}
								disabled={movie.mediaInfo ? true : false}
								onToggle={() => {
									if (selectedMovies.includes(movie)) {
										setSelectedMovies(selectedMovies.filter((selected) => selected !== movie));
									} else {
										setSelectedMovies([...selectedMovies, movie]);
									}
								}}
							/>
						)}
					</div>
					{index !== movies.length - 1 && <Separator />}
				</Fragment>
			))}
		</Card>
	);
}
