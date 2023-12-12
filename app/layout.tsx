import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	height: 'device-height',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	appleWebApp: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className="overscroll-y-none bg-black text-white" lang="en">
			<body className={`${inter.className} flex h-[100dvh] max-h-[100dvh] flex-col`}>
				<div className="flex flex-1 flex-col overflow-auto">{children}</div>

				<nav className="flex h-24 flex-wrap items-center justify-between pb-8 text-neutral-400">
					<Link
						href="/sessions"
						className="flex h-full flex-1 flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-8 w-8"
						>
							<path
								fillRule="evenodd"
								d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="text-[.6rem] font-bold">Sessions</p>
					</Link>
					<Link href="/search" className="flex h-full flex-1 flex-col items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-8 w-8"
						>
							<path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
								clipRule="evenodd"
							/>
						</svg>

						<p className="text-[.6rem] font-bold">Search</p>
					</Link>
					<Link
						href="/downloads"
						className="flex h-full flex-1 flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-8 w-8"
						>
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
								clipRule="evenodd"
							/>
						</svg>

						<p className="text-[.6rem] font-bold">Downloads</p>
					</Link>
					<Link
						href="/containers"
						className="flex h-full flex-1 flex-col items-center justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-8 w-8"
						>
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
								clipRule="evenodd"
							/>
						</svg>

						<p className="text-[.6rem] font-bold">Containers</p>
					</Link>
				</nav>
			</body>
		</html>
	);
}
