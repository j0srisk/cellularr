'use client';

import { Session } from '@/app/types';
import { fetcher, FormatDuration } from '@/app/utils';
import CenteredMessage from '@/components/CenteredMessage';
import Header from '@/components/Header';
import MediaCardSmall from '@/components/MediaCardSmall';
import { useState } from 'react';
import useSWR from 'swr';

export default function Page() {
	const [sessions, setSessions] = useState<Session[]>([]);

	const { data, error } = useSWR('/api/tautulliproxy?cmd=get_activity', fetcher, {
		refreshInterval: 5000,
		onSuccess: (data) => {
			setSessions([]);
			data.response.data.sessions.forEach((tautulliSession: any) => {
				const guid =
					tautulliSession.grandparent_guids.find((guid: string) => guid.startsWith('tmdb://')) ||
					tautulliSession.guids.find((guid: string) => guid.startsWith('tmdb://'));
				const text = guid.substring('tmdb://'.length);
				console.log(text);
				const session: Session = {
					id: tautulliSession.session_key,
					title: tautulliSession.grandparent_title || tautulliSession.title,
					mediaType: tautulliSession.media_type === 'episode' ? 'tv' : tautulliSession.media_type,
					progress: tautulliSession.progress_percent,
					user: tautulliSession.friendly_name,
					userThumb: tautulliSession.user_thumb,
					player: tautulliSession.player,
					year: tautulliSession.year,
					posterPath: tautulliSession.thumb,
					backdropPath: tautulliSession.art,
					ratingKey: tautulliSession.rating_key,
					duration: tautulliSession.stream_duration,
					state: tautulliSession.state,
					tmdbId: text,
					season: tautulliSession.parent_media_index,
					episode: tautulliSession.media_index,
				};
				setSessions((sessions) => [...sessions, session]);
			});
		},
	});

	return (
		<div className="pt-safe pb-nav flex h-full w-full flex-col px-4">
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
