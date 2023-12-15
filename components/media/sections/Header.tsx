import MetadataDetails from '../MetadataDetails';
import { MovieDetails } from '@/app/types';
import RequestButton from '@/components/media/RequestButton';

export default function Header({ mediaDetails }: { mediaDetails: MovieDetails }) {
	return (
		<div className="flex h-fit w-full flex-col items-center justify-center px-4 pb-3">
			{/* Title */}
			<p className="pb-1 text-center text-3xl font-bold text-white/95">{mediaDetails.title}</p>
			{/* Media Info */}
			<MetadataDetails mediaDetails={mediaDetails} />
			{/* Play / Request Button */}
			<div className="flex w-full flex-col items-center px-6">
				<RequestButton media={mediaDetails} />
			</div>
		</div>
	);
}
