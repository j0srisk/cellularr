'use client';

import { useState, useCallback, useRef } from 'react';

function useBackdropScale(initialBackdropHeight: number) {
	const [backdropHeight, setBackdropHeight] = useState(initialBackdropHeight);
	const [scaleFactor, setScaleFactor] = useState(1);

	const divRef = useRef(null);

	const setRef = useCallback((node: any) => {
		if (node !== null) {
			setBackdropHeight(node.offsetHeight);
			divRef.current = node;
		}
	}, []);

	const handleScroll = useCallback(
		(event: React.UIEvent<HTMLDivElement>) => {
			const currentPosition = event.currentTarget.scrollTop;
			if (currentPosition < 0) {
				const scaleFactor = 1 - currentPosition / backdropHeight;
				setScaleFactor(scaleFactor);
			}
		},
		[backdropHeight],
	);

	return { backdropHeight, setBackdropHeight, scaleFactor, handleScroll, setRef };
}

export default useBackdropScale;
