import { MovieDetails } from '@/app/types';
import MediaCardCompact from '@/components/MediaCardCompact';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import SnapCarousel from '@/components/SnapCarousel';

export default function VideosSection({ mediaDetails }: { mediaDetails: MovieDetails }) {
	if (!mediaDetails.relatedVideos[0]) {
		return null;
	} else {
		return (
			<MediaDetailsSection heading={'Videos'}>
				<SnapCarousel>
					{mediaDetails.relatedVideos?.map((video) => (
						<MediaCardCompact
							key={video.key}
							title={video.name}
							subtitle={video.type}
							imageUrl={'http://i3.ytimg.com/vi/' + video.key + '/hqdefault.jpg'}
							url={video.url}
						/>
					))}
				</SnapCarousel>
			</MediaDetailsSection>
		);
	}
}
