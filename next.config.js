/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: 'i3.ytimg.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'plex.tv',
				pathname: '**',
			},
			{
				protocol: 'http',
				hostname: '192.168.1.93',
				pathname: '**',
			},
		],
	},
	output: 'standalone',
};

module.exports = nextConfig;
