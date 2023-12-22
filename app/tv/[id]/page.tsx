import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: number } }) {
	//just redirect to the first season if no season number is provided
	redirect('/tv/' + params.id + '/season/' + 1);
}
