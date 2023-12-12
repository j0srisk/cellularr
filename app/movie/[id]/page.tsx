import { MovieDetails, MediaStatus, MediaType, Cast } from '@/app/types';
import { CreatePosterUrl, CreateBackdropUrl, FormatDuration } from '@/app/utils';
import CastMember from '@/components/CastMember';
import MediaBackdrop from '@/components/MediaBackdrop';
import MediaDetails from '@/components/MediaDetailsPage';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import PlayButton from '@/components/PlayButton';
import Poster from '@/components/Poster';
import ProcessingButton from '@/components/ProcessingButton';
import RequestButton from '@/components/RequestButton';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import type { Viewport } from 'next';

export const viewport: Viewport = {
	viewportFit: 'cover',
};

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerrproxy/movie/' + id, {
		cache: 'no-cache',
	});

	const movieDetails: MovieDetails = await overseerrResponse.json();

	//set the mediaType to movie because MovieDetails doesn't return a mediaType
	movieDetails.mediaType = MediaType.MOVIE;

	if (movieDetails.releaseDate) {
		const releaseDate = new Date(movieDetails.releaseDate);
		const formattedDate = releaseDate.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});

		movieDetails.formattedReleaseDate = formattedDate;
	}

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<MediaDetails movieDetails={movieDetails} />
		</>
	);
}
