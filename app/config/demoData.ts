import { Session, MediaType } from '@/app/types';

export const demoSessions: Session[] = [
	{
		id: '4',
		title: 'Fartgo',
		mediaType: MediaType.TV,
		progress: 72,
		user: 'txrisk27',
		userThumb: 'https://plex.tv/users/8af8e9a7aae2c3d4/avatar?c=1704454441',
		player: 'Josephs-MBP.localdomain',
		year: '2014',
		posterPath: '/6U9CPeD8obHzweikFhiLhpc7YBT.jpg',
		backdropPath: '/nDOIsgCYZqEMvomSR6t9QUIPZJS.jpg',
		ratingKey: '61097',
		duration: 3807935,
		state: 'paused',
		tmdbId: 60622,
		season: 1,
		episode: 10,
	},
	{
		id: '20',
		title: 'Fartgo',
		mediaType: MediaType.TV,
		progress: 72,
		user: 'txrisk27',
		userThumb: 'https://plex.tv/users/8af8e9a7aae2c3d4/avatar?c=1704454441',
		player: 'Josephs-MBP.localdomain',
		year: '2014',
		posterPath: '/6U9CPeD8obHzweikFhiLhpc7YBT.jpg',
		backdropPath: '/nDOIsgCYZqEMvomSR6t9QUIPZJS.jpg',
		ratingKey: '61097',
		duration: 3807935,
		state: 'paused',
		tmdbId: 60622,
		season: 1,
		episode: 10,
	},
];

export const demoApplications: any[] = [
	{
		Media: [
			{
				Plex: {
					href: 'http://192.168.1.93:32400',
					background: '#282A2D',
				},
			},
			{
				Overseerr: {
					href: 'http://192.168.1.93:5055',
					background: '#131928',
				},
			},
			{
				Tautulli: {
					href: 'http://192.168.1.93:8181',
					background: '#282A2D',
				},
			},
			{
				Radarr: {
					href: 'http://192.168.1.93:7878',
				},
			},
			{
				Sonarr: {
					href: 'http://192.168.1.93:8989',
					background: '#00CCFF',
				},
			},
			{
				Readarr: {
					href: 'http://192.168.1.93:8888',
					background: '#8F2222',
				},
			},
		],
	},
	{
		Server: [
			{
				Unraid: {
					icon: 'unraid.png',
					href: 'http://192.168.1.93',
					background: '#141414',
				},
			},
			{
				Docker: {
					icon: 'docker.png',
					href: 'http://192.168.1.93/docker',
					background: '#fff',
				},
			},
		],
	},
	{
		Homebridges: [
			{
				'Homebridge Conroe': {
					icon: 'homebridge.svg',
					href: 'http://192.168.1.93:8581',
					background: '#441E56',
				},
			},
			{
				'Homebridge Cheswood': {
					icon: 'homebridge.svg',
					href: 'http://172.16.0.100:8581',
					background: '#441E56',
				},
			},
			{
				'Homebridge Farm': {
					icon: 'homebridge.svg',
					href: 'http://100.97.33.117:8581',
					background: '#441E56',
				},
			},
		],
	},
];
