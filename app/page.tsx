'use client';

import { getActivityData } from '@/app/actions';
import CenteredMessage from '@/components/CenteredMessage';
import NavigationBar from '@/components/Common/NavigationBar/Index';
import SessionCard from '@/components/Sessions/SessionCard/SessionCard';
import useSWR from 'swr';

export default function SessionPage() {
	const { data: activityData } = useSWR('activityData', () => getActivityData(), {
		refreshInterval: 5000,
	});

	if (activityData) {
		return (
			<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
				<NavigationBar
					title="Now Streaming"
					subtitle={activityData.sessions.length + ' sessions found'}
					className=""
				/>
				<div className="pb-nav-4 grid h-fit w-full gap-4 px-4 pt-4 md:grid-cols-3">
					{activityData.sessions.length > 0 ? (
						<>
							{activityData.sessions.map((session) => (
								<SessionCard key={session.session_key} session={session} />
							))}
						</>
					) : (
						<CenteredMessage text="No streams? 🤨" />
					)}
				</div>
			</div>
		);
	}
}
