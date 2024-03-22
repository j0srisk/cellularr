import { ServiceProfile } from '@/services/overseerr/types/common';

export interface SonarrSettings {
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
	activeLanguageProfileId: number;
	activeAnimeProfileId: number;
	activeAnimeLanguageProfileId: number;
	activeAnimeProfileName: string;
	activeAnimeDirectory: string;
	is4k: boolean;
	enableSeasonFolders: boolean;
	isDefault: boolean;
	externalUrl: string;
	syncEnabled: boolean;
	preventSearch: boolean;
}

export interface Sonarr {
	server: SonarrSettings;
	profiles: ServiceProfile[];
}
