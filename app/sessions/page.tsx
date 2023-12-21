import { FormatDuration, GetSessions } from '@/app/utils';
import CenteredMessage from '@/components/CenteredMessage';
import Header from '@/components/Header';
import MediaCardSmall from '@/components/MediaCardSmall';
import Refresher from '@/components/Refresher';

export default async function Page() {
	const sessions = await GetSessions();

	return (
		<div className="pt-safe pb-nav flex h-full w-full flex-col px-4">
			<Refresher refreshInterval={10000} />
			<Header heading="Now Streaming" subheading={sessions.length + ' Active Sessions'} />
			<div className="no-scrollbar flex h-full w-full flex-col justify-start gap-[18px] overflow-auto overflow-x-hidden">
				{sessions[0] ? (
					<>
						{sessions.map((session) => (
							<>
								<MediaCardSmall
									key={session.id}
									imageUrl={'/api/tautulliproxy?cmd=pms_image_proxy&img=' + session.backdropPath}
									title={session.title}
									detailsArray={[
										session.user,
										session.season ? 'S' + session.season + ', E' + session.episode : session.year,
										session.player,
									]}
									durationText={
										session.state !== 'paused'
											? FormatDuration(
													Math.floor((session.duration * (1 - session.progress / 100)) / 1000 / 60),
											  ) + ' left'
											: 'Paused'
									}
									progress={session.progress}
									iconUrl={session.userThumb}
									href={'/' + session.mediaType + '/' + session.tmdbId}
								/>
							</>
						))}
					</>
				) : (
					<CenteredMessage text="the sound of silence ..." />
				)}
			</div>
		</div>
	);
}
