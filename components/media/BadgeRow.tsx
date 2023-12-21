import { RottenTomatoesBadge } from './Badges';
import {
	ContentRatingBadge,
	ResolutionBadge,
	DynamicRangeBadge,
	ClosedCaptionBadge,
} from './Badges';
import { MediaType, FileMetadata } from '@/app/types';
import { GetRatings } from '@/app/utils';
import Link from 'next/link';

type BadgeRowProps = {
	id: number;
	mediaType: MediaType;
	contentRating: string;
	tautulliMetadata?: FileMetadata;
};

export default async function BadgeRow({
	id,
	mediaType,
	contentRating,
	tautulliMetadata,
}: BadgeRowProps) {
	const ratings = await GetRatings(mediaType, id);

	return (
		<div className="no-scrollbar text-label-secondary-dark flex w-full items-center gap-[5px] overflow-x-scroll px-4">
			{ratings && ratings.criticsRating && (
				<Link href={ratings.url ? ratings.url : '#'} className="flex items-center gap-1">
					<RottenTomatoesBadge criticsRating={ratings.criticsRating} />
					<p className="text-footnote h-fit w-fit uppercase">
						{ratings.criticsScore ? <>{ratings.criticsScore}%</> : <>--</>}
					</p>
				</Link>
			)}
			<ContentRatingBadge contentRating={contentRating} />
			{tautulliMetadata && (
				<>
					<ResolutionBadge resolution={tautulliMetadata.resolution} />
					<DynamicRangeBadge dynamicRange={tautulliMetadata.dynamicRange} />
					{tautulliMetadata.subtitles.length > 0 && <ClosedCaptionBadge />}
				</>
			)}
		</div>
	);
}
