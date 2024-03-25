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
			<Card className="shadow-drop-xs">
				{mediaType !== MediaType.MUSIC && (
					<Image
						src={backdropUrl + mediaDetails.backdropPath}
						alt={session.title}
						height={1920}
						width={800}
						className="aspect-video w-full object-cover object-center"
						priority={true}
					/>
				)}

				<div className="flex flex-col gap-4 p-4">
					<div className="flex w-full justify-start gap-3">
						{mediaType !== MediaType.MUSIC && (
							<PosterCard
								title={session.title}
								id={parseInt(tmdbId)}
								posterPath={mediaDetails.posterPath}
								mediaType={mediaType}
								className="h-full w-14 rounded-[5px] border-none shadow-none"
							/>
						)}
						<div className="flex h-fit w-full flex-col justify-between">
							{mediaType === MediaType.MOVIE && (
								<>
									<p className="text-title-2-emphasized">{session.title}</p>
									<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
										{session.year}
									</p>
								</>
							)}
							{mediaType === MediaType.TV && (
								<>
									<p className="text-title-2-emphasized">{session.grandparent_title}</p>
									<p className="hidden text-footnote text-label-secondary-light dark:text-label-secondary-dark">
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
					</div>
					<div className="relative h-1.5 w-full overflow-hidden rounded-sm bg-fill-tetiary-light dark:bg-fill-tetiary-dark">
						<div
							style={{ width: session.transcode_progress + '%' }}
							className="absolute h-full bg-fill-secondary-light dark:bg-fill-secondary-dark"
						></div>
						<div
							style={{ width: session.progress_percent + '%' }}
							className="absolute h-full bg-system-orange-light dark:bg-system-orange-dark"
						></div>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1.5">
							<Image
								src={session.user_thumb}
								alt={session.username}
								height={100}
								width={100}
								className="h-5 w-5 rounded-full"
								priority={true}
							/>
							<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
								{session.username}
							</p>
						</div>
						{location && (
							<div className="flex hidden items-center gap-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-4 w-4 text-label-primary-light dark:text-label-primary-dark"
								>
									<path
										fillRule="evenodd"
										d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
										clipRule="evenodd"
									/>
								</svg>

								<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
									{location.city && location.region
										? `${location.city}, ${location.region}`
										: location.city || location.region}
								</p>
							</div>
						)}
						<div className="flex flex-1 items-center justify-end gap-2">
							<p className="text-footnote-emphasized tracking-tight text-system-orange-light dark:text-system-orange-dark">
								See Details
							</p>
						</div>
					</div>
				</div>
			</Card>
		);
	}
}
