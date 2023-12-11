import { MediaStatus } from '@/app/types';
import { MovieDetails } from '@/app/types';
import { CreatePosterUrl } from '@/app/utils';
import Poster from '@/components/Poster';
import Link from 'next/link';

export default function MediaCard({ movieDetails }: { movieDetails: MovieDetails }) {
	return (
		<Link className="group" href={'/' + movieDetails.mediaType + '/' + movieDetails.id}>
			<div className="flex w-full items-center gap-4 px-2">
				<div className="aspect-[2/3] h-16">
					<Poster url={CreatePosterUrl(movieDetails.posterPath)} alt={movieDetails.title} />
				</div>

				<div className="flex w-full flex-col items-start justify-center truncate">
					<p className="text w-full truncate text-left font-semibold text-white">
						{movieDetails.title}
					</p>

					<div className="flex flex-row items-center gap-2 opacity-60">
						<p className="w-full truncate text-left text-xs font-semibold text-white">
							{movieDetails.releaseDate?.split('-')[0]}
						</p>
						{movieDetails.mediaInfo?.status && (
							<p className="p-.5 rounded-sm border border-white px-1 text-[.5rem] font-bold uppercase">
								{MediaStatus[movieDetails.mediaInfo.status]}
							</p>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
}
