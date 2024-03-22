import PersonCard from '@/components/Common/PersonCard';
import PosterCard from '@/components/Common/PosterCard';
import { MovieResult, PersonResult, TvResult } from '@/services/overseerr/types/search';
import { Fragment } from 'react';

export default function MediaSlider({
	results,
}: {
	results: (MovieResult | TvResult | PersonResult)[];
}) {
	return (
		<div className="no-scrollbar flex w-full gap-2 overflow-x-auto px-4 py-1">
			{results.map((result: MovieResult | TvResult | PersonResult) => (
				<Fragment key={result.id}>
					{result.mediaType === 'person' ? (
						<PersonCard name={result.name} profilePath={result.profilePath} />
					) : (
						<PosterCard
							id={result.id}
							mediaType={result.mediaType}
							title={(result as TvResult).name || (result as MovieResult).title}
							posterPath={result.posterPath}
							className="w-32"
							href={'/' + result.mediaType + '/' + result.id}
						/>
					)}
				</Fragment>
			))}
		</div>
	);
}
