import { MovieDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import MediaCardCompact from '@/components/MediaCardCompact';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import SnapCarousel from '@/components/SnapCarousel';

export default async function RelatedMediaSection({
	mediaDetails,
}: {
	mediaDetails: MovieDetails;
}) {
	//get related media from overseerr
	const recommendedMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + mediaDetails.id + '/recommendations',
	);

	const { results: recommendedMedia } = await recommendedMediaResponse.json();
	return (
		<MediaDetailsSection heading={'Related'}>
			<SnapCarousel>
				{recommendedMedia.map((media: MovieDetails) => (
					<MediaCardCompact
						key={media.id}
						title={media.title}
						subtitle={media.releaseDate?.split('-')[0]}
						imageUrl={CreateBackdropUrl(media.backdropPath)}
						url={'/movie/' + media.id}
					/>
				))}
			</SnapCarousel>
		</MediaDetailsSection>
	);
}
