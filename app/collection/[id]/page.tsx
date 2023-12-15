import { MovieDetails, MediaType, MediaStatus, Subtitle, Audio, Collection } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import Cast from '@/components/media/sections/Cast';
import Header from '@/components/media/sections/Header';
import Information from '@/components/media/sections/Information';
import Languages from '@/components/media/sections/Languages';
import Movies from '@/components/media/sections/Movies';
import Overview from '@/components/media/sections/Overview';
import RecommendedMedia from '@/components/media/sections/RecommendedMedia';
import SimilarMedia from '@/components/media/sections/SimilarMedia';
import Videos from '@/components/media/sections/Videos';
import type { Viewport } from 'next';

//sets the viewport to the entire screen so backdrop image surrounds notch or dynamic island
export const viewport: Viewport = {
	viewportFit: 'cover',
};

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
						<Header
							name={collection.name}
							metadataDetailsArray={collectionDetails}
							button={
								<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-black">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#000000"
										viewBox="0 0 24 24"
										role="img"
										className="h-4 w-4"
									>
										<title>Plex icon</title>
										<path d="M11.643 0H4.68l7.679 12L4.68 24h6.963l7.677-12-7.677-12" />
									</svg>
									<p className="font-bold">Collection Button</p>
								</button>
							}
						/>
					</div>
				</div>
				<div className="flex flex-col bg-black pb-28">
					<Overview overview={collection.overview} id={collection.id} mediaType="collection" />
					<Movies collection={collection} />
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
