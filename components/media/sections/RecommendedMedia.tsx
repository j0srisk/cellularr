import { MovieDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Divider from '@/components/Divider';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';

export default async function RecommendedMedia({ mediaDetails }: { mediaDetails: MovieDetails }) {
	//get related media from overseerr
	const recommendedMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + mediaDetails.id + '/recommendations',
	);

	const { results: recommendedMedia } = await recommendedMediaResponse.json();

	if (recommendedMedia.length === 0) {
		return null;
	}

	return (
		<SectionTemplate heading={'Recommended'}>
			<SnapCarousel>
				{recommendedMedia.map((media: MovieDetails) => (
					<MediaCardSmall
						key={media.id}
						title={media.title}
						subtitle={media.releaseDate?.split('-')[0]}
						imageUrl={CreateBackdropUrl(media.backdropPath)}
						url={'/movie/' + media.id}
					/>
				))}
			</SnapCarousel>
			<Divider />
		</SectionTemplate>
	);
}
