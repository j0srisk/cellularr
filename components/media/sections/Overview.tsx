import { MovieDetails, MediaStatus, Subtitle } from '@/app/types';
import Divider from '@/components/Divider';
import {
	RottenTomatoesBadge,
	ContentRatingBadge,
	ResolutionBadge,
	DynamicRangeBadge,
	ClosedCaptionBadge,
} from '@/components/media/Badges';
import SectionTemplate from '@/components/media/SectionTemplate';
import Link from 'next/link';

export default async function OverviewSection({ mediaDetails }: { mediaDetails: MovieDetails }) {
	const ratingsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + mediaDetails.id + '/ratings',
	);

	mediaDetails.rating = await ratingsResponse.json();

	if (mediaDetails.overview === '') {
		mediaDetails.overview = 'No overview available.';
	}

	return (
		<SectionTemplate>
			<p className="mb-3 px-4 text-sm font-normal text-white/95">{mediaDetails.overview}</p>
			<div className="no-scrollbar text-off-white mb-3 flex w-full items-center gap-[5px] overflow-x-scroll px-4">
				<Link
					href={mediaDetails.rating.url ? mediaDetails.rating.url : '#'}
					className="flex items-center gap-1"
				>
					<RottenTomatoesBadge criticsRating={mediaDetails.rating.criticsRating} />
					<p className="h-fit w-fit rounded-sm text-xs font-medium uppercase">
						{mediaDetails.rating.criticsScore ? <>{mediaDetails.rating.criticsScore}%</> : <>--</>}
					</p>
				</Link>

				{mediaDetails.tatutulliMetadata && (
					<>
						<ContentRatingBadge contentRating={mediaDetails.tatutulliMetadata.contentRating} />
						<ResolutionBadge resolution={mediaDetails.tatutulliMetadata.resolution} />
						<DynamicRangeBadge dynamicRange={mediaDetails.tatutulliMetadata.dynamicRange} />
						{mediaDetails.tatutulliMetadata.subtitles.length > 0 && <ClosedCaptionBadge />}
					</>
				)}
			</div>
			<Divider />
		</SectionTemplate>
	);
}
