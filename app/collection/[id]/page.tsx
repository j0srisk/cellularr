'use client';

import { getCollection } from '@/app/actions';
import { MediaType } from '@/app/typess';
import MediaPage from '@/components/MediaPage';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const { data: collection } = useSWR(`collection-${params.id}`, () =>
		getCollection(parseInt(params.id)),
	);

	if (!collection) {
		return null;
	}

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
