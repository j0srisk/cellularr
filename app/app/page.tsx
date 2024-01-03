'use client';

import { GetActiveSessions } from '@/app/actions';
import { Session } from '@/app/types';
import { FormatDuration, CreateBackdropUrl } from '@/app/utils';
import CenteredMessage from '@/components/CenteredMessage';
import Header from '@/components/Header';
import MediaCard from '@/components/MediaCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SessionPage() {
	const [sessions, setSessions] = useState<Session[]>([]);

	const router = useRouter();

	useEffect(() => {
		//get sessions from session storage first
		if (typeof window !== 'undefined' && window.sessionStorage) {
			const sessionStorageSessions = JSON.parse(sessionStorage.getItem('sessions') || '[]');
			setSessions(sessionStorageSessions);
		}

		//fetch active sessions
		async function fetchData() {
			const sessions = await GetActiveSessions();
			setSessions(sessions);
			sessionStorage.setItem('sessions', JSON.stringify(sessions));
		}
		fetchData();

		//update sessions every 10 seconds
		const interval = setInterval(fetchData, 10000);

		//cleanup to prevent memory leaks
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header heading="Now Streaming" subheading={sessions.length + ' Active Sessions'} />
			<div className="no-scrollbar pb-nav flex h-full w-full flex-col justify-start gap-[18px] overflow-auto overflow-x-hidden">
				{sessions[0] ? (
					<>
						{sessions.map((session) => (
							<button
								key={session.id}
								onClick={() => router.replace('/app/' + session.mediaType + '/' + session.tmdbId)}
							>
								<MediaCard
									imageUrl={CreateBackdropUrl(session.backdropPath)}
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
								/>
							</button>
						))}
					</>
				) : (
					<CenteredMessage text="the sound of silence ..." />
				)}
			</div>
		</div>
	);
}
