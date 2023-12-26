import { MovieDetails, MediaType, MediaStatus, Subtitle, Audio, Collection } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import SnapCarousel from '@/components/SnapCarousel';
import Hero from '@/components/media/Hero';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Header from '@/components/media/sections/Header';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';

export default async function Page({ params }: { params: { id: string } }) {
	//gets tmdb movie id from the url
	const id = params.id;

	//gets movie details from overseerr
	const overseerrResponse = await fetch(
		'http://localhost:3000/api/overseerrproxy/collection/' + id,
		{
			cache: 'no-cache',
		},
	);

	const collection: Collection = await overseerrResponse.json();

	const collectionDetails = [];

	const collectionYears =
		collection.parts
			?.map((media: MovieDetails) => media.releaseDate?.split('-')[0])
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
					{collection.parts && (
						<SectionTemplate heading={'Movies'}>
							<SnapCarousel>
								{collection.parts.map((media: MovieDetails) => (
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

					{/*
					<Videos mediaDetails={movieDetails} />
					<SimilarMedia mediaDetails={movieDetails} />
					<RecommendedMedia mediaDetails={movieDetails} />
					<Cast mediaDetails={movieDetails} />
					<Information mediaDetails={movieDetails} />
					<Languages mediaDetails={movieDetails} />
                    */}
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
