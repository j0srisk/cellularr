import { File, CriticRating } from '@/app/types';
import {
	RottenTomatoesBadge,
	ContentRatingBadge,
	ResolutionBadge,
	DynamicRangeBadge,
	ClosedCaptionBadge,
} from '@/components/media/Badges';
import Link from 'next/link';

type BadgeRowProps = {
	criticsRating?: CriticRating | null;
	contentRating: string;
	file?: File | null;
};

export default function BadgeRow({ criticsRating, contentRating, file }: BadgeRowProps) {
	return (
		<div className="no-scrollbar z-20 flex w-full items-center gap-[5px] overflow-x-scroll px-4 text-label-secondary-dark">
			{criticsRating && (
				<Link
					href={criticsRating.url ? criticsRating.url : '#'}
					className="flex items-center gap-1"
				>
					<RottenTomatoesBadge criticsRating={criticsRating.criticsRating} />
					<p className="h-fit w-fit text-footnote uppercase">
						{criticsRating.criticsScore ? <>{criticsRating.criticsScore}%</> : <>--</>}
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
