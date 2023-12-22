'use client';

import { useState } from 'react';

export default function ScrollTrackingBackdrop({
	url,
	children,
}: {
	url?: String;
	children?: React.ReactNode;
}) {
	const [scroll, setScroll] = useState(0);

	//opacity goes to 0 as you scroll up
	const calculateOpacity = () => {
		const opacity = scroll < 0 ? 1 : 1 - scroll / window.innerHeight;
		return opacity;
	};

	return (
		<>
			<div
				className="no-scrollbar flex h-full flex-col overflow-y-scroll"
				onScroll={(e) => setScroll((e.target as HTMLElement).scrollTop)}
			>
				{children}

				<div
					style={{
						height: `calc(75vh - ${scroll < 0 ? scroll : 0}px)`,
						backgroundImage: `url(${url})`,
					}}
					className="absolute top-0 -z-10 flex w-full items-center justify-center bg-cover bg-center"
				/>
			</div>
		</>
	);
}
