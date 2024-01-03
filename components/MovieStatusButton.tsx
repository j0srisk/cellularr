import { Movie } from '@/app/types';
import { MediaStatus, MediaType } from '@/app/types';
import Request from '@/components/Request';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function StatusButton({ movie }: { movie: Movie }) {
	if (movie.requestStatus === MediaStatus.UNKNOWN) {
		return <Request type={MediaType.MOVIE} id={movie.id} movie={movie} text={'Request Movie'} />;
	}

	if (movie.requestStatus === MediaStatus.PENDING) {
		return <Button text="Request Pending" className="bg-white text-label-primary-light" />;
	}

	if (movie.requestStatus === MediaStatus.PROCESSING) {
		return <Button text="Request Processing" className="bg-white text-label-primary-light" />;
	}

	if (
		movie.requestStatus === MediaStatus.AVAILABLE ||
		movie.requestStatus === MediaStatus.PARTIALLY_AVAILABLE
	) {
		return (
			<Link href={movie.iOSPlexUrl || '#'} className="w-full">
				<Button text="Play on Plex" className="bg-white text-label-primary-light" />
			</Link>
		);
	}
}
