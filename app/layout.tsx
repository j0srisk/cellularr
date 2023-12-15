import './globals.css';
import Navbar from '@/components/Navbar';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

//const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	height: 'device-height',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className="overscroll-y-none bg-black text-white" lang="en">
			<body className="h-[100dvh] overflow-hidden">
				{children}
				<Navbar />
			</body>
		</html>
	);
}
