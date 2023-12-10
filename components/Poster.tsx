export default function Poster({ url, alt }: { url: string | null | undefined; alt: string }) {
	let posterUrl = '';

	if (!url) {
		posterUrl = '/overseerr_poster_not_found.png';
	} else {
		posterUrl = url;
	}

	return (
		<img src={posterUrl} alt={alt} className="h-full w-full rounded-md bg-gray-900 shadow-md" />
	);
}
