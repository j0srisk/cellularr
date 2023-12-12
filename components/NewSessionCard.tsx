import { Session } from '@/app/types';

export default function SessionCard({ session }: { session: Session }) {
	return (
		<div className="relative flex h-full w-full flex-col items-start gap-4 rounded-xl bg-zinc-900 p-4 ">
			<div className="flex w-full items-center justify-between gap-4">
				<img
					src={'http://172.16.0.161:3000/api/tautulli/pms-image-proxy/' + session.ratingKey}
					alt="icon"
					className="h-20 rounded-sm shadow-lg"
				/>
				<div className="flex w-full flex-col">
					<p className="w-full truncate font-semibold">{session.title}</p>
					<p className="w-full truncate text-xs font-semibold text-neutral-400">{session.year}</p>
					{session.duration && (
						<p className="w-full truncate text-xs font-semibold text-neutral-400">
							{(Number(session.progress) / 100) * (session.duration / 1000)} :{' '}
							{session.duration / 1000}
						</p>
					)}
				</div>
			</div>
			<div className="flex w-full flex-col justify-between gap-2">
				<div className="h-2 w-full overflow-hidden rounded-sm bg-black">
					<div className="h-full bg-amber-500" style={{ width: `${session.progress}%` }} />
				</div>
			</div>
			<div className="flex items-center gap-2">
				<img src={session.userThumb} alt="icon" className="h-8 rounded-full shadow-lg" />
				<div className="flex flex-col">
					<p className="text-xs font-semibold opacity-60">{session.user}</p>
					<p className="text-xs font-semibold opacity-60">{session.player}</p>
				</div>
			</div>
		</div>
	);
}
