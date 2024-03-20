import { Session, MediaType } from '@/app/types';
import { FormatDuration, CreatePosterUrl } from '@/app/utils';
import Image from 'next/image';

export default function SessionCard({ session }: { session: Session }) {
	const formattedDuration = FormatDuration(
		Math.floor((session.duration * (1 - session.progress / 100)) / 1000 / 60),
	);

	const timeString = new Date(
		new Date().getTime() +
			Math.floor((session.duration * (1 - session.progress / 100)) / 1000) * 1000,
	).toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});

	session.city = session.city || ' ';
	session.region = session.region || '';

	return (
		<div className="flex w-full flex-col rounded-xl border border-fill-tetiary-light bg-fill-tetiary-light bg-cover shadow-sm dark:border-fill-tetiary-dark dark:bg-fill-tetiary-dark">
			<div className="flex items-center gap-3 p-3">
				<Image
					src={CreatePosterUrl(session.posterPath)}
					alt={session.title}
					height={300}
					width={200}
					className="aspect-[1/1.5] h-fit w-14 rounded-[4px]"
				/>
				<div className="flex h-fit flex-col items-start">
					{session.mediaType === MediaType.MOVIE && (
						<>
							<p className="text-body">{session.title}</p>
							<p className="text-footnote">{session.year}</p>
						</>
					)}
					{session.mediaType === MediaType.TV && (
						<>
							<p className="text-body">{session.grandparentTitle}</p>
							<p className="text-footnote">{session.title}</p>
							<p className="text-footnote">
								S{session.season} • E{session.episode}
							</p>
						</>
					)}
					<p className="text-footnote">
						{session.state !== 'paused'
							? formattedDuration + ' left (' + timeString + ')'
							: 'Paused (' + formattedDuration + ' left)'}
					</p>
				</div>
			</div>
			<div className="relative h-1 w-full bg-fill-tetiary-light dark:bg-fill-tetiary-dark">
				<div
					style={{ width: session.transcodeProgress + '%' }}
					className="absolute h-full bg-fill-secondary-light dark:bg-fill-secondary-dark"
				></div>
				<div
					style={{ width: session.progress + '%' }}
					className="absolute h-full bg-system-orange-light dark:bg-system-orange-dark"
				></div>
			</div>
			<div className="flex items-center gap-3 p-3">
				<div className="flex h-full w-14 items-center justify-center">
					<Image
						src={session.userThumb}
						alt={session.user}
						height={100}
						width={100}
						className="h-10 w-10 rounded-full"
					/>
				</div>

				<div className="flex h-fit min-h-[54px] flex-col items-start justify-center">
					<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
						{session.user}
					</p>
					<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
						{session.player}
					</p>
					<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
						{session.city && session.region
							? `${session.city}, ${session.region}`
							: session.city || session.region}
					</p>
				</div>
			</div>
		</div>
	);
}
