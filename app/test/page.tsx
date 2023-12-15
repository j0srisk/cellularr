import type { Viewport } from 'next';

//sets the viewport to the entire screen so backdrop image surrounds notch or dynamic island
export const viewport: Viewport = {
	viewportFit: 'cover',
};

export default function Page() {
	return <div className="h-full w-full border border-blue-500 bg-red-500" />;
}
