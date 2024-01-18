import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Cellularr',
		short_name: 'Cellularr',
		description: 'Cellularr Progressive Web App',
		start_url: '/',
		scope: '/',
		display: 'fullscreen',
		background_color: '#000',
		theme_color: '#000',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	};
}
