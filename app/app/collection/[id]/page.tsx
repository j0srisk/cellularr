'use client';

import { GetCollection } from '@/app/actions';
import { Collection, Movie } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import SnapCarousel from '@/components/SnapCarousel';
import Hero from '@/components/media/Hero';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Button from '@/components/ui/Button';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Page() {
	const params = useParams<{ id: string }>();

	const [collection, setCollection] = useState<Collection | null>(null);

	useEffect(() => {
		async function fetchData() {
			const collection: Collection = await GetCollection(parseInt(params.id));

			setCollection(collection);
		}
		fetchData();
	}, [params.id]);

	const router = useRouter();

	if (!collection) {
		return null;
	}

	const collectionDetails = [];

	const collectionYears =
		collection.movies
			?.map((movie: Movie) => movie.releaseDate?.split('-')[0])
			.sort()
			.filter((year) => year !== '') || [];

	const firstYear = collectionYears[0];

	const lastYear = collectionYears[collectionYears.length - 1];

	if (firstYear === lastYear) {
		collectionDetails.push(firstYear);
	} else {
		collectionDetails.push(firstYear + ' - ' + lastYear);
	}

	return (
		<div className="flex h-full w-full animate-fade">
			<ScrollTrackingBackdrop url={CreateBackdropUrl(collection.backdropPath)}>
				<Hero
					title={collection.name}
					metadataDetailsArray={collectionDetails}
					overview={collection.overview}
					contentRating={''}
				>
					<Button className="bg-white text-system-primary-dark" text="Play" />
				</Hero>
				<div className="pb-nav flex flex-col gap-[18px] bg-system-primary-light py-3 dark:bg-system-primary-dark">
					{collection.movies && (
						<SectionTemplate heading={'Movies'}>
							<SnapCarousel>
								{collection.movies.map((media: Movie) => (
									<button
										key={media.id}
										className="w-[calc(50%-6px)] flex-shrink-0"
										onClick={() => router.replace('/movie/' + media.id)}
									>
										<MediaCard
											title={media.title}
											detailsArray={[media.releaseDate?.split('-')[0]]}
											imageUrl={CreateBackdropUrl(media.backdropPath)}
										/>
									</button>
								))}
							</SnapCarousel>
						</SectionTemplate>
					)}
				</div>
			</ScrollTrackingBackdrop>
		</div>
	);
}
