import { MediaType, Cast, TvDetails } from '@/app/types';
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
import BadgeRow from '@/components/media/BadgeRow';
import CastMember from '@/components/media/CastMember';
import DownloadStatus from '@/components/media/DownloadStatus';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Header from '@/components/media/sections/Header';
import Seasons from '@/components/media/sections/Seasons';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';

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
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="flex h-fit w-full items-end bg-gradient-to-t from-system-primary-light pt-20 dark:from-system-primary-dark">
						<Header name={tvDetails.name} metadataDetailsArray={tvDetailsArray}>
							<Button className="bg-white text-system-primary-dark" text="Play" />
							<Request type={MediaType.TV} seasons={tvDetails.seasons} />
						</Header>
					</div>
				</div>
				<div className="pb-nav flex flex-col gap-3 bg-system-primary-light dark:bg-system-primary-dark">
					<SectionTemplate>
						<p className="line-clamp-3 px-4 text-subheadline">{tvDetails.overview}</p>
						<BadgeRow
							id={tvDetails.id}
							mediaType={tvDetails.mediaType}
							contentRating={contentRating.rating}
						/>
					</SectionTemplate>
					<Seperator className="px-4" />
					{tvDetails.mediaInfo?.downloadStatus && (
						<DownloadStatus downloadStatus={tvDetails.mediaInfo.downloadStatus} />
					)}
					<Seperator className="px-4" />
					<Seasons tvDetails={tvDetails} firstSeason={firstSeason} contentRating={contentRating} />

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
