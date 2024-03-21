'use client';

import { getActivityData } from '@/app/actions';
import CenteredMessage from '@/components/CenteredMessage';
import Header from '@/components/Header';
import SessionCard from '@/components/Sessions/SessionCard/SessionCard';
import useSWR from 'swr';

export default function SessionPage() {
	const { data: activityData } = useSWR('activityData', () => getActivityData(), {
		refreshInterval: 5000,
	});

	if (activityData) {
		return (
			<div className="pt-safe flex h-full w-full flex-col px-4 md:py-1">
				<Header
					heading="Now Streaming"
					subheading={activityData.stream_count + ' Active Sessions'}
				/>
				<div className="no-scrollbar pb-nav grid w-full gap-[18px] overflow-auto overflow-x-hidden md:grid-cols-3">
					{activityData.sessions.length > 0 ? (
						<>
							{activityData.sessions.map((session) => (
								<SessionCard key={session.session_key} session={session} />
							))}
						</>
					) : (
						<CenteredMessage text="the sound of silence ..." />
					)}
				</div>
			</div>
		);
	}
}
