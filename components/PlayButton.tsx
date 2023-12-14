import { MovieDetails } from '@/app/types';
import Link from 'next/link';

export default function PlayButton({ mediaDetails }: { mediaDetails: MovieDetails }) {
	return (
		<Link
			href={
				mediaDetails.mediaInfo?.iOSPlexUrl
					? mediaDetails.mediaInfo.iOSPlexUrl
					: 'https://app.plex.tv'
			}
			className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="hidden h-5 w-5"
			>
				<path
					fillRule="evenodd"
					d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
					clipRule="evenodd"
				/>
			</svg>

			<p className="font-bold">Watch on Plex</p>
		</Link>
	);
}
