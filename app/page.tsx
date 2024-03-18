'use client';

import { getActiveSessions } from '@/app/actionss';
import { Session, MediaType } from '@/app/types';
import CenteredMessage from '@/components/CenteredMessage';
import Header from '@/components/Header';
import SessionCard from '@/components/SessionCard';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export default function SessionPage() {
	const { data: sessions } = useSWR('sessions', getActiveSessions, {
		refreshInterval: 5000,
	});

	const router = useRouter();

	if (!sessions) {
		return (
			<div className="pt-safe flex h-full w-full flex-col px-4 md:py-1">
				<Header heading="Now Streaming" subheading="Loading..." />
			</div>
		);
	}

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4 md:py-1">
			<Header heading="Now Streaming" subheading={sessions.length + ' Active Sessions'} />
			<div className="no-scrollbar pb-nav grid w-full gap-[18px] overflow-auto overflow-x-hidden md:grid-cols-3">
				{sessions[0] ? (
					<>
						{sessions.map((session) => (
							<button
								key={session.id}
								onClick={() => {
									if (session.mediaType !== MediaType.MUSIC) {
										router.replace('/' + session.mediaType + '/' + session.tmdbId);
									}
								}}
								className=""
							>
								<SessionCard key={session.id} session={session} />
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
