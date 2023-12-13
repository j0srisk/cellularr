import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className="fixed bottom-0 flex h-24 w-full flex-wrap items-center justify-between border-t border-zinc-800 bg-black bg-opacity-60 pb-8 text-neutral-400 backdrop-blur-xl">
			<Link
				href="/sessions"
				className="flex h-full flex-1 flex-col items-center justify-center gap-px"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="h-7 w-7"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
					/>
				</svg>

				<p className="text-[.6rem] font-bold">Sessions</p>
			</Link>
			<Link
				href="/search"
				className="flex h-full flex-1 flex-col items-center justify-center gap-px"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="h-7 w-7"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>

				<p className="text-[.6rem] font-bold">Search</p>
			</Link>
			<Link
				href="/downloads"
				className="flex h-full flex-1 flex-col items-center justify-center gap-px"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="h-7 w-7"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
					/>
				</svg>

				<p className="text-[.6rem] font-bold">Downloads</p>
			</Link>
			<Link
				href="/containers"
				className="flex h-full flex-1 flex-col items-center justify-center gap-px"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="h-7 w-7"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
					/>
				</svg>

				<p className="text-[.6rem] font-bold">Containers</p>
			</Link>
		</nav>
	);
}
