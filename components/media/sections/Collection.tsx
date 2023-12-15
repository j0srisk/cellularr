import { Collection, MovieDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Divider from '@/components/Divider';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';

export default function Videos({ collection }: { collection: Collection }) {
	if (!collection) {
		return null;
	}

	return (
		<SectionTemplate heading={'Collection'}>
			<SnapCarousel>
				<MediaCardSmall
					key={collection.id}
					title={collection.name}
					imageUrl={CreateBackdropUrl(collection.backdropPath)}
					url={'/collection/' + collection.id}
					viewWidth={66}
				/>
			</SnapCarousel>
			<Divider />
		</SectionTemplate>
	);
}
