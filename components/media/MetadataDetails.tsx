import { MovieDetails } from '@/app/types';
import { FormatDuration } from '@/app/utils';

export default function MetadataDetails({ mediaDetails }: { mediaDetails: MovieDetails }) {
	return (
		<div
			className="text-off-white
							 mb-3 flex w-full items-center justify-center gap-1 text-xs font-semibold"
		>
			{mediaDetails.genres[0] && (
				<>
					<p>{mediaDetails.genres[0].name}</p>
				</>
			)}
			<p>•</p>
			{mediaDetails.releaseDate && (
				<>
					<p>{mediaDetails.releaseDate?.split('-')[0]}</p>
				</>
			)}
			<p>•</p>
			{mediaDetails.runtime !== 0 && (
				<>
					<>{FormatDuration(mediaDetails.runtime)}</>
				</>
			)}
		</div>
	);
}
