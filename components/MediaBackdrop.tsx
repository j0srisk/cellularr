'use client';

export interface MediaBackdropProps {
	url: string;
	scroll: number;
}

export default function MediaBackdrop({ url, scroll }: MediaBackdropProps) {
	// only grows the backdrop when scrolling down
	if (scroll > 0) {
		scroll = 0;
	}

	return (
		<div
			style={{
				height: `calc(66vh - ${scroll}px)`,
				'--image-url': `url(${url})`,
			}}
			className="absolute top-0 -z-10 flex w-full items-center justify-center bg-[image:var(--image-url)] bg-cover bg-center"
		></div>
	);
}
