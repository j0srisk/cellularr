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
					posterPath: tautulliSession.thumb,
					backdropPath: tautulliSession.art,
					ratingKey: tautulliSession.rating_key,
					duration: tautulliSession.stream_duration,
				};
				setSessions((sessions) => [...sessions, session]);
			});
		},
	});

	return (
		<div className="flex h-full w-full flex-col gap-6 px-4">
			<div className="flex w-full flex-col pt-5">
				<p className="text-4xl font-black">Now Streaming</p>
				<p className="text-lg font-black text-neutral-400">
					{sessions.length + ' Active Sessions'}
				</p>
			</div>
			<div className="no-scrollbar flex h-full w-full flex-col justify-start gap-6 overflow-auto pb-2">
				{sessions.map((session) => (
					<div key={session.id}>
						<SessionCard session={session} />
					</div>
				))}
			</div>
		</div>
	);
}
