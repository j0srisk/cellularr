'use client';

import Seperator from '@/components/Applications/Seperator';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const Router = useRouter();

	return (
		<nav className="pb-safe bg-nav fixed bottom-0 z-30 w-full text-[#999]">
			<Seperator />
			<div className="flex w-full flex-wrap items-center justify-between px-6 py-[7px]">
				<button
					onClick={() => Router.replace('/')}
					className="flex flex-col items-center gap-[7px]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-[21px]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
						/>
					</svg>

					<p className="text-[10px] font-[510]">Sessions</p>
				</button>
				<button
					onClick={() => Router.replace('/search')}
					className="flex flex-col items-center gap-[7px]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-[21px]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>

					<p className="text-[10px] font-[510]">Search</p>
				</button>
				<button
					onClick={() => Router.replace('/applications')}
					className="flex flex-col items-center gap-[7px]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-[21px]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
						/>
					</svg>

					<p className="text-[10px] font-[510]">Applications</p>
				</button>
			</div>
		</nav>
	);
}
