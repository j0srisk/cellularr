import { getCollection } from '@/app/actions';
import { MediaType } from '@/app/types';
import MediaPage from '@/components/MediaPage';

export default async function CollectionPage({ params }: { params: { id: string } }) {
	const collection = await getCollection(parseInt(params.id));

	return (
		<MediaPage
			id={collection.id}
			mediaType={MediaType.COLLECTION}
			backdropPath={collection.backdropPath}
			posterPath={collection.posterPath}
			title={collection.name}
			attributes={[collection.parts.length + ' Movies']}
			overview={collection.overview}
			movies={collection.parts}
		/>
	);
}
