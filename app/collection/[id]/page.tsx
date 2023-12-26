import { MediaType, Collection, Movie } from '@/app/types';
import { CreateBackdropUrl, GetCollection } from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import SnapCarousel from '@/components/SnapCarousel';
import Hero from '@/components/media/Hero';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Button from '@/components/ui/Button';

export default async function Page({ params }: { params: { id: number } }) {
	const collection: Collection = await GetCollection(params.id);

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
		<>
			<ScrollTrackingBackdrop url={CreateBackdropUrl(collection.backdropPath)}>
				<Hero
					title={collection.name}
					metadataDetailsArray={collectionDetails}
					overview={collection.overview}
					id={collection.id}
					mediaType={MediaType.COLLECTION}
					contentRating={''}
				>
					<Button className="bg-white text-system-primary-dark" text="Play" />
				</Hero>
				<div className="pb-nav flex flex-col gap-[18px] bg-system-primary-light py-3 dark:bg-system-primary-dark">
					{collection.movies && (
						<SectionTemplate heading={'Movies'}>
							<SnapCarousel>
								{collection.movies.map((media: Movie) => (
									<MediaCard
										key={media.id}
										title={media.title}
										detailsArray={[media.releaseDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										className="w-[calc(50%-6px)]"
										href={'/movie/' + media.id}
									/>
								))}
							</SnapCarousel>
						</SectionTemplate>
					)}
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
