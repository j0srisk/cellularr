'use client';

import { getActivityData } from '@/app/actions';
import SessionCard from '@/components/Activity/SessionCard/SessionCard';
import CenteredMessage from '@/components/Common/CenteredMessage';
import NavigationBar from '@/components/Common/NavigationBar';
import SafetyBar from '@/components/Common/SafetyBar';
import useSWR from 'swr';

export default function SessionPage() {
	const { data: activityData } = useSWR('activityData', () => getActivityData(), {
		refreshInterval: 5000,
		revalidateOnFocus: false,
	});

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<SafetyBar />
			<NavigationBar
				title="Now Streaming"
				subtitle={
					activityData ? activityData.sessions.length + ' streams found' : '0 streams found'
				}
			/>
			<div className="pb-nav-4 grid h-fit w-full gap-4 px-4 pt-2 md:grid-cols-3">
				{activityData && activityData.sessions.length > 0 ? (
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
