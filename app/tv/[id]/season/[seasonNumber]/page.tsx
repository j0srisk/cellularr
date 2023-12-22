import { MediaType, Cast, TvDetails, Episode } from '@/app/types';
import {
	CreateBackdropUrl,
	FormatReleaseDate,
	GetMediaDetails,
	GetRecommendedMedia,
	GetSimilarMedia,
	GetSeason,
} from '@/app/utils';
import MediaCardSmall from '@/components/MediaCardSmall';
import Request from '@/components/Request';
import SnapCarousel from '@/components/SnapCarousel';
import CastMember from '@/components/media/CastMember';
import DownloadStatus from '@/components/media/DownloadStatus';
import Hero from '@/components/media/Hero';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SeasonSelector from '@/components/media/SeasonSelector';
import SectionTemplate from '@/components/media/SectionTemplate';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: number; seasonNumber: number } }) {
	//gets movieDetails from overseerr based on the id in the url
	const tvDetails: TvDetails = await GetMediaDetails(MediaType.TV, params.id);

	//set the mediaType to tv because TvDetails doesn't return a mediaType property
	tvDetails.mediaType = MediaType.TV;

	//gets recommended media from overseerr
	const recommendedMedia = await GetRecommendedMedia(tvDetails.mediaType, tvDetails.id);

	//gets similar media from overseerr
	const similarMedia = await GetSimilarMedia(tvDetails.mediaType, tvDetails.id);

	const season = await GetSeason(tvDetails.id, params.seasonNumber);

	if (!season) {
		redirect('/tv/' + tvDetails.id + '/season/' + 1);
		return <></>;
	}

	const contentRating = tvDetails.contentRatings.results.find(
		(contentRating) => contentRating.iso_3166_1 === 'US',
	) || { rating: 'NR' };

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
				<Hero
					title={tvDetails.name}
					metadataDetailsArray={tvDetailsArray}
					overview={tvDetails.overview}
					id={tvDetails.id}
					mediaType={tvDetails.mediaType}
					contentRating={contentRating.rating}
				>
					<Button className="bg-white text-system-primary-dark" text="Play" />
					<Request type={MediaType.TV} seasons={tvDetails.seasons} />
				</Hero>
				<div className="pb-nav flex flex-col items-center gap-3 bg-system-primary-light py-3 dark:bg-system-primary-dark">
					{tvDetails.mediaInfo?.downloadStatus[0] && (
						<>
							<DownloadStatus downloadStatus={tvDetails.mediaInfo.downloadStatus} />
							<Seperator className="px-4" />
						</>
					)}

					<SectionTemplate>
						<SeasonSelector seasons={tvDetails.seasons} />
						<SnapCarousel>
							{season.episodes.map((episode: Episode) => (
								<MediaCardSmall
									key={episode.id}
									className="w-[calc(66%)]"
									heading={`Episode ${episode.episodeNumber}`}
									title={episode.name}
									imageUrl={CreateBackdropUrl(episode.stillPath)}
									viewWidth={66}
								>
									<p className="line-clamp-3 w-full text-left text-footnote text-label-secondary-light dark:text-label-secondary-dark">
										{episode.overview}
									</p>
								</MediaCardSmall>
							))}
						</SnapCarousel>
						<Seperator className="px-4" />
					</SectionTemplate>

					{similarMedia[0] && (
						<SectionTemplate heading={'Similar'}>
							<SnapCarousel>
								{similarMedia.map((media: TvDetails) => (
									<MediaCardSmall
										key={media.id}
										className="w-[calc(50%-6px)]"
										title={media.name}
										detailsArray={[media.firstAirDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										href={'/tv/' + media.id}
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}

					{recommendedMedia[0] && (
						<SectionTemplate heading={'Recommended'}>
							<SnapCarousel>
								{recommendedMedia.map((media: TvDetails) => (
									<MediaCardSmall
										key={media.id}
										className="w-[calc(50%-6px)]"
										title={media.name}
										detailsArray={[media.firstAirDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										href={'/tv/' + media.id}
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					<SectionTemplate heading={'Cast'}>
						<SnapCarousel>
							{tvDetails.credits?.cast.map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</SnapCarousel>
						<Seperator className="px-4" />
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
