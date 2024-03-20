import PersonCard from '@/components/PersonCard';
import PosterCard from '@/components/PosterCard';
import { MovieResult, PersonResult, TvResult } from '@/services/overseerr/types/search';

export default function PosterGrid({
	results,
}: {
	results: (MovieResult | TvResult | PersonResult)[];
}) {
	if (results.length === 0) {
		return null;
	}

	return (
		<div className="grid h-fit grid-cols-3 gap-2">
			{results.map((result: MovieResult | TvResult | PersonResult) =>
				result.mediaType === 'person' ? (
					<PersonCard key={result.id} name={result.name} profilePath={result.profilePath} />
				) : (
					<PosterCard
						id={result.id}
						key={result.id}
						mediaType={result.mediaType}
						title={(result as TvResult).name || (result as MovieResult).title}
						posterPath={result.posterPath}
					/>
				),
			)}
		</div>
	);
}
