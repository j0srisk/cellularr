import { getTvDetails } from '@/app/actions';
import { MediaType } from '@/app/types';
import RequestPage from '@/components/Request/Page';

export default async function RequestTvPage({ params }: { params: { id: string } }) {
	const tvDetails = await getTvDetails(parseInt(params.id));

	return <RequestPage mediaType={MediaType.TV} mediaDetails={tvDetails} />;
}
