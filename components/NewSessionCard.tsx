import { Session } from '@/app/types';
import { FormatDuration } from '@/app/utils';

export default function SessionCard({ session }: { session: Session }) {
	const backdropUrl =
		'http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=pms_image_proxy&img=' +
		session.backdropPath;

	const millisecondsRemaining = session.duration * (1 - session.progress / 100);

	const secondsRemaining = Math.floor(millisecondsRemaining / 1000);

	const minutesRemaining = Math.floor(secondsRemaining / 60);

	return (
		<div className="flex w-full flex-col gap-2">
			<div
				style={
					{
						'--image-url': `url(${backdropUrl})`,
					} as React.CSSProperties
				}
				className="flex aspect-video w-full items-end justify-between rounded-xl bg-[image:var(--image-url)] bg-cover bg-center"
			>
				<div className="flex w-full bg-gradient-to-b from-transparent to-black/80 p-4 pt-8">
					<div className="flex h-10 w-full gap-4">
						<div className="flex h-full w-full flex-col justify-between">
							<p className="text-lg font-black uppercase opacity-60">
								{FormatDuration(minutesRemaining)} left
							</p>
							<div className="flex h-1 w-full rounded-full bg-white bg-opacity-50">
								<div
									style={{ width: `${session.progress}%` }}
									className="h-full  rounded-full bg-white"
								></div>
							</div>
						</div>
						<img src={session.userThumb} alt="icon" className="h-10 w-10 rounded-full" />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-col">
				<p className="text-xl font-black">{session.title}</p>
				<div className="flex w-full items-center gap-2">
					<p className="text-xs font-black text-neutral-400">{session.user}</p>
					<p className="text-xs font-black text-neutral-400">•</p>
					<p className="text-xs font-black text-neutral-400">{session.player}</p>
					<p className="text-xs font-black text-neutral-400">•</p>
					<p className="text-xs font-black text-neutral-400">{session.progress}%</p>
				</div>
			</div>
		</div>
	);
}
