import { RottenTomatoesBadge } from './Badges';
import {
	ContentRatingBadge,
	ResolutionBadge,
	DynamicRangeBadge,
	ClosedCaptionBadge,
} from './Badges';
import { MediaType, File } from '@/app/types';
import overseerr from '@/services/overseerr';
import Link from 'next/link';

type BadgeRowProps = {
	id: number;
	mediaType: MediaType;
	contentRating: string;
	file?: File | null;
};

export default async function BadgeRow({ id, mediaType, contentRating, file }: BadgeRowProps) {
	const ratings = await overseerr.getRatings(mediaType, id);

	return (
		<div className="no-scrollbar z-20 flex w-full items-center gap-[5px] overflow-x-scroll px-4 text-label-secondary-dark">
			{ratings && ratings.criticsRating && (
				<Link href={ratings.url ? ratings.url : '#'} className="flex items-center gap-1">
					<RottenTomatoesBadge criticsRating={ratings.criticsRating} />
					<p className="h-fit w-fit text-footnote uppercase">
						{ratings.criticsScore ? <>{ratings.criticsScore}%</> : <>--</>}
					</p>
				</Link>
			)}
			<ContentRatingBadge contentRating={contentRating} />
			{file && (
				<>
					<ResolutionBadge resolution={file.resolution} />
					<DynamicRangeBadge dynamicRange={file.dynamicRange} />
					{file.subtitles.length > 0 && <ClosedCaptionBadge />}
				</>
			)}
		</div>
	);
}
