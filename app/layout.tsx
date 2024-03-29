import './globals.css';
import Navbar from '@/components/ui/Navbar';
import type { Metadata, Viewport } from 'next';

//const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
	width: 'device-width',
	height: 'device-height',
	viewportFit: 'cover',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: 'Cellularr',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			className="overscroll-y-none bg-system-primary-light text-label-primary-light  dark:bg-system-primary-dark dark:text-label-primary-dark"
			lang="en"
		>
			<body className="flex h-[100vh] justify-center overflow-hidden">
				{children}
				<Navbar />
			</body>
		</html>
	);
}
