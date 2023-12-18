import {
	MovieDetails,
	MediaType,
	MediaStatus,
	Subtitle,
	Audio,
	Collection,
	Cast,
	TvDetails,
} from '@/app/types';
import {
	CreateBackdropUrl,
	FormatDuration,
	FormatReleaseDate,
	GetMediaDetails,
	GetRecommendedMedia,
	GetSimilarMedia,
	GetSeason,
} from '@/app/utils';
import Divider from '@/components/Divider';
import MediaCardSmall from '@/components/MediaCardSmall';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import SnapCarousel from '@/components/SnapCarousel';
import CastMember from '@/components/media/CastMember';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Header from '@/components/media/sections/Header';
import Overview from '@/components/media/sections/Overview';
import Seasons from '@/components/media/sections/Seasons';
import type { Viewport } from 'next';

//sets the viewport to the entire screen so backdrop image surrounds notch or dynamic island
export const viewport: Viewport = {
	viewportFit: 'cover',
};

export default async function Page({ params }: { params: { id: string } }) {
	//gets movieDetails from overseerr based on the id in the url
	const tvDetails: TvDetails = await GetMediaDetails(MediaType.TV, params.id);

	//set the mediaType to tv because TvDetails doesn't return a mediaType property
	tvDetails.mediaType = MediaType.TV;

	//gets recommended media from overseerr
	const recommendedMedia = await GetRecommendedMedia(tvDetails.mediaType, tvDetails.id);

	//gets similar media from overseerr
	const similarMedia = await GetSimilarMedia(tvDetails.mediaType, tvDetails.id);

	const firstSeason = await GetSeason(tvDetails.id, 1);

	const contentRating = tvDetails.contentRatings.results.find(
		(contentRating) => contentRating.iso_3166_1 === 'US',
	);

	//gets relevant metadata details for the header
	const tvDetailsArray = [];

	if (tvDetails.genres[0]) {
		tvDetailsArray.push(tvDetails.genres[0].name);
	}

	if (tvDetails.firstAirDate) {
		tvDetailsArray.push(tvDetails.firstAirDate.split('-')[0]);
	}

	if (tvDetails.episodeRunTime[0]) {
		tvDetailsArray.push(tvDetails.episodeRunTime[0] + ' mins');
	}

	if (tvDetails.numberOfSeasons) {
		tvDetailsArray.push(tvDetails.numberOfSeasons + ' seasons');
	}

	return (
		<>
			<ScrollTrackingBackdrop url={CreateBackdropUrl(tvDetails.backdropPath)}>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="flex h-fit w-full items-end bg-gradient-to-t from-black pt-20">
						<Header
							name={tvDetails.name}
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
									<p className="font-bold">Placeholder Button</p>
								</button>
							}
							metadataDetailsArray={tvDetailsArray}
						/>
					</div>
				</div>
				<div className="flex flex-col bg-black pb-28">
					<Overview
						overview={tvDetails.overview}
						id={tvDetails.id}
						mediaType="tv"
						contentRating={contentRating}
					/>
					<Seasons tvDetails={tvDetails} firstSeason={firstSeason} contentRating={contentRating} />
					{similarMedia[0] && (
						<SectionTemplate heading={'Similar'}>
							<SnapCarousel>
								{similarMedia.map((media: TvDetails) => (
									<MediaCardSmall
										key={media.id}
										title={media.name}
										subtitle={media.firstAirDate?.split('-')[0]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										url={'/tv/' + media.id}
									/>
								))}
							</SnapCarousel>
							<Divider />
						</SectionTemplate>
					)}
					{recommendedMedia[0] && (
						<SectionTemplate heading={'Recommended'}>
							<SnapCarousel>
								{recommendedMedia.map((media: TvDetails) => (
									<MediaCardSmall
										key={media.id}
										title={media.name}
										subtitle={media.firstAirDate?.split('-')[0]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										url={'/tv/' + media.id}
									/>
								))}
							</SnapCarousel>
							<Divider />
						</SectionTemplate>
					)}
					<SectionTemplate heading={'Cast'}>
						<SnapCarousel>
							{tvDetails.credits?.cast.map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</SnapCarousel>
						<Divider />
					</SectionTemplate>
					<SectionTemplate heading={'Information'}>
						<InformationItem
							title={'Network'}
							value={tvDetails.networks[0] ? <>{tvDetails.networks[0].name}</> : <>Unknown</>}
						/>
						<InformationItem
							title={'First Air Date'}
							value={
								tvDetails.firstAirDate ? (
									<>{FormatReleaseDate(tvDetails.firstAirDate)}</>
								) : (
									<>Unknown</>
								)
							}
						/>
						{tvDetails.status === 'Ended' && tvDetails.lastAirDate && (
							<InformationItem
								title={'Last Air Date'}
								value={
									tvDetails.lastAirDate ? (
										<>{FormatReleaseDate(tvDetails.lastAirDate)}</>
									) : (
										<>Unknown</>
									)
								}
							/>
						)}
						<InformationItem
							title={'Status'}
							value={tvDetails.status ? <>{tvDetails.status}</> : <>Unknown</>}
						/>
						<InformationItem
							title={'Number of Seasons'}
							value={
								tvDetails.numberOfSeasons ? (
									<>
										{tvDetails.numberOfSeasons} Season{tvDetails.numberOfSeasons > 1 && 's'}
									</>
								) : (
									<>Unknown</>
								)
							}
						/>
						<InformationItem
							title={'Total Episodes'}
							value={
								tvDetails.numberOfEpisodes ? (
									<>
										{tvDetails.numberOfEpisodes} Episode{tvDetails.numberOfEpisodes > 1 && 's'}
									</>
								) : (
									<>Unknown</>
								)
							}
						/>
					</SectionTemplate>
				</div>
			</ScrollTrackingBackdrop>
		</>
	);
}
