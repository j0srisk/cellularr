import { Session, MediaType } from '@/app/types';

export const demoSessions: Session[] = [
	{
		id: '20',
		title: 'TRON: Legacy',
		mediaType: MediaType.MOVIE,
		transcodeProgress: null,
		city: null,
		progress: 43,
		user: 'EchoExplorer77',
		userThumb: 'https://plex.tv/users/da330ea7bbb26dfc/avatar?c=1704493767',
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
		transcodeProgress: null,
		city: null,
		progress: 72,
		user: 'GalacticGeek101',
		userThumb: 'https://plex.tv/users/045f142aee35e61a/avatar?c=1703694171',
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
		transcodeProgress: null,
		city: null,
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
		transcodeProgress: null,
		city: null,
		progress: 93,
		user: 'r0b0t1',
		userThumb: 'https://plex.tv/users/da330ea7bbb26dfc/avatar?c=1704493767',
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
					href: 'https://app.plex.tv',
					background: '#282A2D',
				},
			},
			{
				Overseerr: {
					href: 'https://overseerr.dev',
					background: '#131928',
				},
			},
			{
				Tautulli: {
					href: 'https://tautulli.com',
					background: '#282A2D',
				},
			},
			{
				Radarr: {
					href: 'https://radarr.video',
					background: '#fff',
				},
			},
			{
				Sonarr: {
					href: 'https://sonarr.tv',
					background: '#00CCFF',
				},
			},
			{
				Readarr: {
					href: 'https://readarr.com',
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
					href: 'https://unraid.net',
					background: '#141414',
				},
			},
			{
				Docker: {
					icon: 'docker.png',
					href: 'https://www.docker.com',
					background: '#fff',
				},
			},
		],
	},
];
