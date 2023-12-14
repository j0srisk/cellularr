import CastMember from './CastMember';
import MediaDetailsSection from './MediaDetailsSection';
import SnapCarousel from './SnapCarousel';
import { Cast, MovieDetails } from '@/app/types';

export default function CastSection({ mediaDetails }: { mediaDetails: MovieDetails }) {
	if (!mediaDetails.credits?.cast[0]) {
		return null;
	}

	return (
		<MediaDetailsSection heading={'Cast'}>
			<SnapCarousel>
				{mediaDetails.credits?.cast.map((cast: Cast) => <CastMember key={cast.id} cast={cast} />)}
			</SnapCarousel>
		</MediaDetailsSection>
	);
}
