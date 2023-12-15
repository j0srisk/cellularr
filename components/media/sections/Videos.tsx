import { MovieDetails } from '@/app/types';
import Divider from '@/components/Divider';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
import SectionTemplate from '@/components/media/SectionTemplate';

export default function Videos({ mediaDetails }: { mediaDetails: MovieDetails }) {
	return (
		<SectionTemplate heading={'Videos'}>
			<SnapCarousel>
				{mediaDetails.relatedVideos?.map((video) => (
					<MediaCardSmall
						key={video.key}
						title={video.name}
						subtitle={video.type}
						imageUrl={'http://i3.ytimg.com/vi/' + video.key + '/hqdefault.jpg'}
						url={video.url}
						viewWidth={66}
					/>
				))}
			</SnapCarousel>
			<Divider />
		</SectionTemplate>
	);
}
