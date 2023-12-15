import CastMember from '@/components/media/CastMember';
import SectionTemplate from '@/components/media/SectionTemplate';
import SnapCarousel from '@/components/SnapCarousel';
import { Cast, MovieDetails } from '@/app/types';
import Divider from '@/components/Divider';


export default function Cast({ mediaDetails }: { mediaDetails: MovieDetails }) {


	if (!mediaDetails.credits.cast[0]) {
		return null;
	}

	return (
		<SectionTemplate heading={'Cast'}>
			<SnapCarousel>
				{mediaDetails.credits?.cast.map((cast: Cast) => <CastMember key={cast.id} cast={cast} />)}
			</SnapCarousel>
			<Divider />
		</SectionTemplate>
	);
}
