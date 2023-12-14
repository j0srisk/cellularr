import {
	RottenTomatoesBadge,
	ContentRatingBadge,
	ResolutionBadge,
	DynamicRangeBadge,
} from './MetadataBadges';
import { MovieDetails, FileMetadata, MediaStatus } from '@/app/types';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import Link from 'next/link';

export default async function OverviewSection({ mediaDetails }: { mediaDetails: MovieDetails }) {
	const ratingsResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/movie/' + mediaDetails.id + '/ratings',
	);

	mediaDetails.rating = await ratingsResponse.json();

	if (mediaDetails.overview === '') {
		mediaDetails.overview = 'No overview available.';
	}

	//gets file metadata from tautulli if the media is available on plex
	if (mediaDetails.mediaInfo?.status === MediaStatus.AVAILABLE) {
		const tautulliResponse = await fetch(
			'http://localhost:3000/api/tautulliproxy?cmd=get_metadata&rating_key=' +
				mediaDetails.mediaInfo?.ratingKey,
		);

		const {
			response: { data: tautulliData },
		} = await tautulliResponse.json();

		const mediaMetadata = {
			ratingKey: tautulliData.rating_key,
			mediaType: tautulliData.media_type,
			resolution: tautulliData.media_info[0].video_full_resolution,
			videoCodec: tautulliData.media_info[0].video_codec,
			audioCodec: tautulliData.media_info[0].audio_codec,
			audioChannelLayout: tautulliData.media_info[0].audio_channel_layout,
			contentRating: tautulliData.content_rating,
			dynamicRange: tautulliData.media_info[0].parts[0].streams[0].video_dynamic_range,
		};

		mediaDetails.mediaMetadata = mediaMetadata;
	}
	return (
		<MediaDetailsSection>
			<p className="mb-3 px-4 text-sm font-normal text-white/95">{mediaDetails.overview}</p>
			{mediaDetails.mediaMetadata || mediaDetails.rating ? (
				<div className="no-scrollbar text-off-white mb-3 flex w-full items-center gap-[5px] overflow-x-scroll px-4">
					{mediaDetails.rating && (
						<Link
							href={mediaDetails.rating.url ? mediaDetails.rating.url : '#'}
							className="flex items-center gap-1"
						>
							<RottenTomatoesBadge criticsRating={mediaDetails.rating.criticsRating} />
							<p className="h-fit w-fit rounded-sm text-xs font-medium uppercase">
								{mediaDetails.rating.criticsScore ? (
									<>{mediaDetails.rating.criticsScore}%</>
								) : (
									<>--</>
								)}
							</p>
						</Link>
					)}
					{mediaDetails.mediaMetadata && (
						<>
							<ContentRatingBadge contentRating={mediaDetails.mediaMetadata.contentRating} />
							<ResolutionBadge resolution={mediaDetails.mediaMetadata.resolution} />
							<DynamicRangeBadge dynamicRange={mediaDetails.mediaMetadata.dynamicRange} />
						</>
					)}
				</div>
			) : null}
		</MediaDetailsSection>
	);
}
