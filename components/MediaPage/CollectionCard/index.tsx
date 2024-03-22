import { MediaType } from '@/app/types';
import { backdropUrl } from '@/app/types';
import Button from '@/components/Common/Button';
import Card from '@/components/Common/Card';
import SystemBackground from '@/components/Common/SystemBackground';
import { Collection } from '@/services/overseerr/types/collection';
import { useRouter } from 'next/navigation';

export default function CollectionCard({ collection }: { collection: Collection }) {
	const router = useRouter();

	return (
		<Card className="shadow-drop-xs">
			<div
				className="relative flex h-full bg-cover bg-center"
				style={{
					backgroundImage: collection.backdropPath
						? `url(${backdropUrl + collection.backdropPath})`
						: '',
				}}
			>
				<div className="flex w-full items-center justify-between gap-2 bg-gradient-to-b from-transparent to-system-primary-dark/75 p-4 dark:to-system-primary-dark/75">
					<p className="text-title-3 text-label-primary-dark">{collection.name}</p>
					<SystemBackground className="rounded-lg">
						<Button onClick={() => router.push('/collection/' + collection.id)}>
							<p className="text-subheadline-emphasized">View</p>
						</Button>
					</SystemBackground>
				</div>
			</div>
		</Card>
	);
}
