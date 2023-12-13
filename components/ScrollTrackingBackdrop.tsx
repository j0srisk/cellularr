'use client';

import MediaBackdrop from '@/components/MediaBackdrop';
import { useState } from 'react';

export default function ScrollTrackingBackdrop({
	url,
	children,
}: {
	url?: String;
	children?: React.ReactNode;
}) {
	const [scroll, setScroll] = useState(0);

	return (
		<>
			<div
				className="no-scrollbar flex h-full flex-col overflow-y-scroll"
				onScroll={(e) => setScroll(e.target.scrollTop)}
			>
				{children}

				<div
					style={{
						height: `calc(66vh - ${scroll < 0 ? scroll : 0}px)`,
						'--image-url': `url(${url})`,
					}}
					className="absolute top-0 -z-10 flex w-full items-center justify-center bg-[image:var(--image-url)] bg-cover bg-center"
				/>
			</div>
		</>
	);
}
