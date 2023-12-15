import { MovieDetails, MediaStatus, Subtitle, FileMetadata, Rating } from '@/app/types';
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

type OverviewSectionProps = {
	overview?: string;
	id: number;
	mediaType?: string;
	tatutulliMetadata?: FileMetadata;
};

export default async function OverviewSection({
	overview,
	id,
	mediaType,
	tatutulliMetadata,
}: OverviewSectionProps) {
	const ratingsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/' + mediaType + '/' + id + '/ratings',
	);

	const rating: Rating = await ratingsResponse.json();

	if (overview === '') {
		overview = 'No overview available.';
	}

	return (
		<SectionTemplate>
			<p className="mb-3 px-4 text-sm font-normal text-white/95">{overview}</p>
			{rating.criticsRating || tatutulliMetadata ? (
				<div className="no-scrollbar text-off-white mb-3 flex w-full items-center gap-[5px] overflow-x-scroll px-4">
					{rating.criticsRating && (
						<Link href={rating.url ? rating.url : '#'} className="flex items-center gap-1">
							<RottenTomatoesBadge criticsRating={rating.criticsRating} />
							<p className="h-fit w-fit rounded-sm text-xs font-medium uppercase">
								{rating.criticsScore ? <>{rating.criticsScore}%</> : <>--</>}
							</p>
						</Link>
					)}

					{tatutulliMetadata && (
						<>
							<ContentRatingBadge contentRating={tatutulliMetadata.contentRating} />
							<ResolutionBadge resolution={tatutulliMetadata.resolution} />
							<DynamicRangeBadge dynamicRange={tatutulliMetadata.dynamicRange} />
							{tatutulliMetadata.subtitles.length > 0 && <ClosedCaptionBadge />}
						</>
					)}
				</div>
			) : (
				<></>
			)}
			<Divider />
		</SectionTemplate>
	);
}
