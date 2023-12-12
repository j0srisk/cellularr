'use client';

import { Session } from '@/app/types';
import Heading from '@/components/Heading';
import SessionCard from '@/components/NewSessionCard';
import { useState } from 'react';
import useSWR from 'swr';

export default function Page() {
	const [sessions, setSessions] = useState<Session[]>([]);
	const fetcher = (...args: any[]) =>
		fetch(...args, { method: 'GET', cache: 'no-store' }).then((res) => res.json());

	const { data, error } = useSWR('/api/tautulli/activity', fetcher, {
		refreshInterval: 5000,
		onSuccess: (data) => {
			setSessions([]);
			data.forEach((tautulliSession: any) => {
				console.log(tautulliSession);
				const session: Session = {
					id: tautulliSession.session_key,
					title: tautulliSession.full_title,
					mediaType: 'movie',
					progress: tautulliSession.progress_percent,
					user: tautulliSession.friendly_name,
					userThumb: tautulliSession.user_thumb,
					player: tautulliSession.player,
					year: tautulliSession.year,
					thumb: tautulliSession.thumb,
					ratingKey: tautulliSession.rating_key,
					duration: tautulliSession.stream_duration,
				};
				setSessions((sessions) => [...sessions, session]);
			});
		},
	});

	return (
		<div className="flex h-full w-full flex-col px-4">
			<div className="flex w-full flex-col pt-5">
				<p className="text-4xl font-black">Now Streaming</p>
				<p className="text-lg font-black text-neutral-400">
					{sessions.length + ' Active Sessions'}
				</p>
			</div>
			<div className="flex h-full w-full flex-col justify-start gap-2 overflow-auto pb-2">
				{sessions.map((session) => (
					<div key={session.id}>
						<SessionCard session={session} />
					</div>
				))}
			</div>
			<Heading heading="Now Playing" subheading={sessions.length + ' Active Sessions'} />
		</div>
	);
}
