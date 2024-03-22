import { getCollection } from '@/app/actions';
import { MediaType } from '@/app/types';
import MediaPage from '@/components/MediaPage/Page';
import { MediaStatus } from '@/services/overseerr/types/common';

export default async function CollectionPage({ params }: { params: { id: string } }) {
	const collection = await getCollection(parseInt(params.id));

	let mediaStatus: MediaStatus | undefined;

	let requestedMovies = 0;

	let availableMovies = 0;

	collection.parts.forEach((movie) => {
		if (movie.mediaInfo) {
			requestedMovies++;

			if (movie.mediaInfo?.status === MediaStatus.AVAILABLE) {
				availableMovies++;
			}
		}
	});

	if (availableMovies === collection.parts.length) {
		mediaStatus = MediaStatus.AVAILABLE;
	} else if (availableMovies > 0) {
		mediaStatus = MediaStatus.PARTIALLY_AVAILABLE;
	} else if (requestedMovies > 0) {
		mediaStatus = MediaStatus.PENDING;
	}

	return (
		<MediaPage
			id={collection.id}
			mediaType={MediaType.COLLECTION}
			mediaDetails={collection}
			requestStatus={mediaStatus}
			backdropPath={collection.backdropPath}
			posterPath={collection.posterPath}
			title={collection.name}
			attributes={[collection.parts.length + ' Movies']}
			overview={collection.overview}
			movies={collection.parts}
		/>
	);
}
