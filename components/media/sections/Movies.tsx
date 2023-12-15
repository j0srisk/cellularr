import { MovieDetails, Collection } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Divider from '@/components/Divider';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';

export default async function Movies({ collection }: { collection: Collection }) {
	if (!collection) {
		return null;
	}
	return (
		<SectionTemplate heading={'Movies'}>
			<SnapCarousel>
				{collection.parts?.map((media: MovieDetails) => (
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
