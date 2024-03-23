import { getCollection } from '@/app/actions';
import { MediaType } from '@/app/types';
import RequestPage from '@/components/Request/Page';

export default async function RequestCollectionPage({ params }: { params: { id: string } }) {
	const collection = await getCollection(parseInt(params.id));

	return <RequestPage mediaType={MediaType.COLLECTION} mediaDetails={collection} />;
}
