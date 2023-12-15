import { MovieDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Divider from '@/components/Divider';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';

export default async function SimilarMedia({ mediaDetails }: { mediaDetails: MovieDetails }) {
	//get related media from overseerr
	const similarMediaResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + mediaDetails.id + '/similar',
	);

	const { results: similarMedia } = await similarMediaResponse.json();

	if (similarMedia.length === 0) {
		return null;
	}

	return (
		<SectionTemplate heading={'Similar'}>
			<SnapCarousel>
				{similarMedia.map((media: MovieDetails) => (
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
