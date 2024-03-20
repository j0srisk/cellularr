import { ServiceProfile } from '@/services/overseerr/types/common';

export interface Radarr {
	server: RadarrSettings;
	profiles: ServiceProfile[];
}

export interface RadarrServers extends Array<RadarrSettings> {}

export interface RadarrSettings {
	id: number;
	name: string;
	hostname: string;
	port: number;
	//apiKey: string;
	useSsl: boolean;
	baseUrl: string;
	activeProfileId: number;
	activeProfileName: string;
	activeDirectory: string;
	is4k: boolean;
	minimumAvailability: string;
	isDefault: boolean;
	externalUrl: string;
	syncEnabled: boolean;
	preventSearch: boolean;
}
