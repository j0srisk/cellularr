/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['image.tmdb.org', 'i3.ytimg.com', 'plex.tv'],
	},
};

module.exports = nextConfig;
