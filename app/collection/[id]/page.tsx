import { MovieDetails, MediaType, MediaStatus, Subtitle, Audio, Collection } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import MediaCardSmall from '@/components/MediaCardSmall';
import SnapCarousel from '@/components/SnapCarousel';
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
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="flex h-fit w-full items-end bg-gradient-to-t from-black pt-20">
						<Header name={collection.name} metadataDetailsArray={collectionDetails}>
							<Button className="text-system-primary-dark bg-white" text="Play" />
						</Header>
					</div>
				</div>
				<div className="pb-nav flex flex-col gap-[9px] bg-black">
					<SectionTemplate>
						<p className="text-label-primary-dark text-subheadline px-4">{collection.overview}</p>
					</SectionTemplate>
					<Seperator className="px-4" />
					{collection.parts && (
						<SectionTemplate heading={'Movies'}>
							<SnapCarousel>
								{collection.parts.map((media: MovieDetails) => (
									<MediaCardSmall
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
