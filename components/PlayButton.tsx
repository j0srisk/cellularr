import { MovieDetails } from '@/app/types';
import Link from 'next/link';

export default function PlayButton({ movieDetails }: { movieDetails: MovieDetails }) {
	return (
		<Link
			href={
				movieDetails.mediaInfo?.iOSPlexUrl
					? movieDetails.mediaInfo?.iOSPlexUrl
					: 'https://app.plex.tv'
			}
			className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-amber-400 bg-amber-500 py-2 text-base font-semibold"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				className="hidden h-4 w-4"
			>
				<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
			</svg>
			Watch on Plex
		</Link>
	);
}
