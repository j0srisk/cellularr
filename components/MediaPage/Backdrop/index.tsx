import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Backdrop({
	backdropUrl,
	backdropHeight,
	scaleFactor,
	blurred = true,
	setBackdropLoaded,
}: {
	backdropUrl: string;
	backdropHeight: number;
	scaleFactor: number;
	blurred?: boolean;
	setBackdropLoaded?: (loaded: boolean) => void;
}) {
	const [loaded, setLoaded] = useState(false);
	return (
		<Image
			src={backdropUrl}
			alt="Backdrop"
			height={backdropHeight}
			width={800}
			priority={true}
			className={`fixed bottom-0 left-0 right-0 top-0 -z-10 h-full w-full transform-gpu object-cover object-center ${
				blurred ? 'blur-sm' : ''
			}`}
			style={{
				height: backdropHeight,
				transformOrigin: 'top',
				transform: `scale(${scaleFactor})`,
				transition: 'transform linear',
			}}
			onLoad={() => {
				console.log('Backdrop loaded');
				setBackdropLoaded && setBackdropLoaded(true);
			}}
		/>
	);
}
