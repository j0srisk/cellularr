import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Unraid Dashboard',
		short_name: 'Unraid',
		description: 'Next.js App',
		start_url: '/search',
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
