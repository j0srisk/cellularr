import { MovieDetails } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Link from 'next/link';

type MediaCardCompactProps = {
	title: string;
	subtitle?: string;
	imageUrl: string;
	url: string;
};

export default function MediaCardCompact({
	title,
	subtitle,
	imageUrl,
	url,
}: MediaCardCompactProps) {
	return (
		<Link
			style={{ width: 'calc(50vw - 22px)' }}
			href={url}
			className="flex flex-shrink-0 snap-start scroll-ml-4 flex-col gap-1"
		>
			<img
				src={imageUrl}
				alt={title}
				className=" aspect-video rounded-lg object-cover object-center"
			/>
			<div className="flex w-full flex-col">
				<p className="w-full truncate text-sm font-medium text-white">{title}</p>
				<p className="w-full truncate text-xs font-medium text-neutral-400">{subtitle}</p>
			</div>
		</Link>
	);
}
