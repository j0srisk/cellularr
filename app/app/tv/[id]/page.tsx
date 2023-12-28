'use client';

import { redirect } from 'next/navigation';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	//just redirect to the first season if no season number is provided
	router.replace('/app/tv/' + params.id + '/season/' + 1);
}
