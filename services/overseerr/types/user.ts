import { PageInfo } from '@/services/overseerr/types/common';

export interface User {
	id: number;
	email: string;
	plexUsername: string | null;
	username: string | null;
	recoveryLinkExpirationDate: string | null;
	userType: number;
	plexId: number | null;
	avatar: string;
	movieQuotaLimit: number | null;
	movieQuotaDays: number | null;
	tvQuotaLimit: number | null;
	tvQuotaDays: number | null;
	createdAt: string;
	updatedAt: string;
	requestCount: number;
	displayName: string;
}

export interface Users {
	pageInfo: PageInfo;
	results: User[];
}
