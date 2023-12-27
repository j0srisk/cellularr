'use server';

import overseerr from '@/services/overseerr';
import tautulli from '@/services/tautulli';

export async function searchOverseerr(query: string, page?: number, language?: string) {
	const searchResults = await overseerr.search(query, page, language);

	return searchResults;
}

export async function getActiveSessions() {
	const sessions = await tautulli.getSessions();

	return sessions;
}
