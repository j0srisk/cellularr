import { MovieDetails, MediaType } from '@/app/types';
import { CreateBackdropUrl } from '@/app/utils';
import Divider from '@/components/Divider';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import Cast from '@/components/media/sections/Cast';
import Header from '@/components/media/sections/Header';
import Information from '@/components/media/sections/Information';
import Overview from '@/components/media/sections/Overview';
import RelatedMedia from '@/components/media/sections/RelatedMedia';
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
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerrproxy/movie/' + id, {
		cache: 'no-cache',
	});

	const movieDetails: MovieDetails = await overseerrResponse.json();

	//set the mediaType to movie because MovieDetails doesn't return a mediaType property
	movieDetails.mediaType = MediaType.MOVIE;

	console.log(movieDetails.releaseDate);

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)}>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="h-fit w-full bg-gradient-to-t from-black to-transparent pt-20">
						<Header mediaDetails={movieDetails} />
					</div>
				</div>
				<div className="flex flex-col bg-black pb-24">
					<Overview mediaDetails={movieDetails} />
					<Divider />
					<Videos mediaDetails={movieDetails} />
					<Divider />
					<RelatedMedia mediaDetails={movieDetails} />
					<Divider />
					<Cast mediaDetails={movieDetails} />
					<Divider />
					<Information mediaDetails={movieDetails} />
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
