import { Session, MediaType } from '@/app/types';

export const demoSessions: Session[] = [
	{
		id: '20',
		title: 'TRON: Legacy',
		mediaType: MediaType.MOVIE,
		progress: 43,
		user: 'EchoExplorer77',
		userThumb: 'https://plex.tv/users/8af8e9a7aae2c3d4/avatar?c=1704454441',
		player: 'Apple TV',
		year: '2010',
		posterPath: '/vuifSABRpSnxCAOxEnWpNbZSXpp.jpg',
		backdropPath: '/zK7wNuUQ4w0QQp9FF20YTPVgpyN.jpg',
		ratingKey: '43951',
		duration: 7508672,
		state: 'playing',
		tmdbId: 20526,
		season: undefined,
		episode: undefined,
	},
	{
		id: '4',
		title: 'Fargo',
		mediaType: MediaType.TV,
		progress: 72,
		user: 'GalacticGeek101',
		userThumb: 'https://plex.tv/users/8af8e9a7aae2c3d4/avatar?c=1704454441',
		player: 'Samsung Smart TV',
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
		id: '21',
		title: 'Seinfeld',
		mediaType: MediaType.TV,
		progress: 1,
		user: 'j0srisk',
		userThumb: 'https://plex.tv/users/8af8e9a7aae2c3d4/avatar?c=1704454441',
		player: 'Josephs Macbook Pro',
		year: '',
		posterPath: '/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg',
		backdropPath: '/mlAzs3tyl5253roHi6eIRbeuONN.jpg',
		ratingKey: '17978',
		duration: 1417249,
		state: 'playing',
		tmdbId: 1400,
		season: 7,
		episode: 1,
	},
	{
		id: '22',
		title: 'Blade Runner 2049',
		mediaType: MediaType.MOVIE,
		progress: 93,
		user: 'r0b0t1',
		userThumb: 'https://plex.tv/users/8af8e9a7aae2c3d4/avatar?c=1704454441',
		player: 'Samsung Smart Fridge',
		year: '2017',
		posterPath: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
		backdropPath: '/ilRyazdMJwN05exqhwK4tMKBYZs.jpg',
		ratingKey: '1423',
		duration: 9807861,
		state: 'playing',
		tmdbId: 335984,
		season: undefined,
		episode: undefined,
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
