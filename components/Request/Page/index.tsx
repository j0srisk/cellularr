'use client';

import { MediaType } from '@/app/types';
import MediaHero from '@/components/MediaPage/Hero';
import Request from '@/components/Request';
import useBackdropScale from '@/hooks/useBackdropScale';
import { Collection } from '@/services/overseerr/types/collection';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { TvDetails } from '@/services/overseerr/types/tv';

export default function RequestPage({
	mediaType,
	mediaDetails,
}: {
	mediaType: MediaType.MOVIE | MediaType.TV | MediaType.COLLECTION;
	mediaDetails: MovieDetails | TvDetails | Collection;
}) {
	const { backdropHeight, scaleFactor, handleScroll, setRef } = useBackdropScale(0);

	return (
		<div
			className="pb-nav no-scrollbar flex h-screen w-screen flex-col overflow-auto"
			onScroll={handleScroll}
		>
			<MediaHero
				mediaType={mediaType}
				mediaDetails={mediaDetails}
				backdropHeight={backdropHeight}
				scaleFactor={scaleFactor}
				setRef={setRef}
				blurred={false}
				hidden={true}
			/>
			<Request mediaType={mediaType} mediaDetails={mediaDetails} backdropHeight={backdropHeight} />
		</div>
	);
}
