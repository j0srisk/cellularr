import { MovieDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Link from 'next/link';

export default function MediaCardCompact({ media }: { media: MovieDetails }) {
	return (
		<Link
			href={`/${media.mediaType}/${media.id}`}
			className="flex w-48 flex-shrink-0 flex-col gap-1"
		>
			<img
				src={CreateBackdropUrl(media.backdropPath)}
				alt={media.title}
				className="aspect-video rounded-lg object-cover object-center"
			/>
			<div className="flex flex-col">
				<p className="w-full truncate text-sm font-black text-white">{media.title}</p>
				<p className="w-full truncate text-xs font-black text-neutral-400">
					{media.releaseDate?.split('-')[0]}
				</p>
			</div>
		</Link>
	);
}
