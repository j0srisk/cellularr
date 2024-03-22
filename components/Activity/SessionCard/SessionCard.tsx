import { getLocation, getMediaDetails } from '@/app/actions';
import { MediaType, backdropUrl } from '@/app/types';
import { formatDuration } from '@/app/utils';
import Card from '@/components/Common/Card';
import PosterCard from '@/components/Common/PosterCard';
import { Session } from '@/services/tautulli/types/activity';
import Image from 'next/image';
import useSWR from 'swr';

export default function SessionCard({ session }: { session: Session }) {
	const formattedDuration = formatDuration(
		Math.floor(
			(Number(session.duration) * (1 - Number(session.progress_percent) / 100)) / 1000 / 60,
		),
	);

	const timeString = new Date(
		new Date().getTime() +
			Math.floor((Number(session.duration) * (1 - Number(session.progress_percent) / 100)) / 1000) *
				1000,
	).toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});

	const mediaType =
		session.media_type === 'movie'
			? MediaType.MOVIE
			: session.media_type === 'episode'
				? MediaType.TV
				: MediaType.MUSIC;
	const tmdbId =
		session.grandparent_guids
			?.find((guid: string) => guid.startsWith('tmdb://'))
			?.substring('tmdb://'.length) ||
		session.guids.find((guid: string) => guid.startsWith('tmdb://'))!.substring('tmdb://'.length);

	const { data: location } = useSWR(`${session.session_key}-location`, () =>
		getLocation(session.ip_address),
	);

	const { data: mediaDetails } = useSWR(`${mediaType}-${tmdbId}-details`, () =>
		getMediaDetails(mediaType, parseInt(tmdbId)),
	);

	if (mediaDetails) {
		return (
			<Card className="shadow-drop-md">
				{mediaType !== MediaType.MUSIC && (
					<Image
						src={backdropUrl + mediaDetails.backdropPath}
						alt={session.title}
						height={1920}
						width={800}
						className="aspect-video w-full object-cover object-center"
					/>
				)}
				<div className="relative h-1.5 w-full bg-fill-tetiary-light dark:bg-fill-tetiary-dark">
					<div
						style={{ width: session.transcode_progress + '%' }}
						className="absolute h-full bg-fill-secondary-light dark:bg-fill-secondary-dark"
					></div>
					<div
						style={{ width: session.progress_percent + '%' }}
						className="absolute h-full bg-system-orange-light dark:bg-system-orange-dark"
					></div>
				</div>
				<div className="flex w-full items-start justify-start gap-3 p-3">
					<div className="flex h-fit w-full flex-col justify-start">
						{mediaType === MediaType.MOVIE && (
							<>
								<p className="text-body-emphasized">{session.title}</p>
								<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
									{session.year}
								</p>
							</>
						)}
						{mediaType === MediaType.TV && (
							<>
								<p className="text-body-emphasized">{session.grandparent_title}</p>
								<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
									{session.title}
								</p>
								<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
									S{session.parent_media_index} • E{session.media_index}
								</p>
							</>
						)}
						<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
							{session.state !== 'paused'
								? formattedDuration + ' left (' + timeString + ')'
								: 'Paused (' + formattedDuration + ' left)'}
						</p>
					</div>
					{mediaType !== MediaType.MUSIC && (
						<PosterCard
							title={session.title}
							id={parseInt(tmdbId)}
							posterPath={mediaDetails.posterPath}
							mediaType={mediaType}
							className="w-14 rounded-[5px] border-none shadow-none"
						/>
					)}
				</div>

				<div className="flex hidden items-center gap-3 p-3">
					<div className="flex h-full w-14 items-center justify-center">
						<Image
							src={session.user_thumb}
							alt={session.username}
							height={100}
							width={100}
							className="h-10 w-10 rounded-full"
						/>
					</div>

					<div className="flex h-fit min-h-[54px] flex-col items-start justify-center">
						<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
							{session.username}
						</p>
						<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
							{session.player}
						</p>
						{location && (
							<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
								{location.city && location.region
									? `${location.city}, ${location.region}`
									: location.city || location.region}
							</p>
						)}
					</div>
				</div>
			</Card>
		);
	}
}
