'use client';

import { MovieDetails } from '@/app/types';
import { useRouter } from 'next/navigation';

export default function RequestButton({ media }: { media: MovieDetails }) {
	const router = useRouter();

	const handleRequest = async () => {
		console.log('requesting');
		const response = await fetch('/api/overseerr/request', {
			method: 'POST',
			body: JSON.stringify({
				mediaType: media.mediaType,
				mediaId: media.id,
				userId: 6,
			}),
		});
		const data = await response.json();
		router.refresh();
	};

	return (
		<button
			className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black"
			onClick={handleRequest}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={3}
				stroke="currentColor"
				className="h-5 w-5"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
				/>
			</svg>

			<p className="text-lg font-black">Request</p>
		</button>
	);
}
