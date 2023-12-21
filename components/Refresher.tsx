'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Refresher({ refreshInterval }: { refreshInterval: number }) {
	const router = useRouter();

	useEffect(() => {
		const interval = setInterval(() => {
			router.refresh();
		}, refreshInterval);

		return () => clearInterval(interval);
	}, [refreshInterval, router]);

	return null;
}
