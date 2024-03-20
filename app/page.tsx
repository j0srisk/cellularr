'use client';

import { getActiveSessions } from '@/app/actions';
import { MediaType } from '@/app/typess';
import SessionCard from '@/components/ Sessions/SessionCard/SessionCard';
import CenteredMessage from '@/components/CenteredMessage';
import Header from '@/components/Header';
import useSWR from 'swr';

export default function SessionPage() {
	const { data: sessions } = useSWR('sessions', getActiveSessions, {
		refreshInterval: 5000,
	});

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
							<button key={session.id} className="">
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
