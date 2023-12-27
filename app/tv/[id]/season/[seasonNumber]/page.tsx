import { Cast, Episode, Series } from '@/app/types';
import {
	CreateBackdropUrl,
	FormatReleaseDate,
	GetRecommendedMedia,
	GetSimilarMedia,
	GetSeason,
	GetSeries,
} from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import Request from '@/components/Request';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import SnapCarousel from '@/components/SnapCarousel';
import CastMember from '@/components/media/CastMember';
import DownloadStatus from '@/components/media/DownloadStatus';
import Hero from '@/components/media/Hero';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SeasonSelector from '@/components/media/SeasonSelector';
import SectionTemplate from '@/components/media/SectionTemplate';
import StatusButton from '@/components/media/StatusButton';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: number; seasonNumber: number } }) {
	//gets tvDetails from overseerr based on the id in the url
	const tvDetails: Series = await GetSeries(params.id);

	//gets recommended media from overseerr
	const recommendedMedia = await GetRecommendedMedia(tvDetails.mediaType, tvDetails.id);

	//gets similar media from overseerr
	const similarMedia = await GetSimilarMedia(tvDetails.mediaType, tvDetails.id);

	const season = await GetSeason(tvDetails.id, params.seasonNumber);

	if (!season) {
		//redirect to first season if season number is invalid
		redirect('/tv/' + tvDetails.id + '/season/' + 1);
	}

	return (
		<>
			<SaveToRecentSearches series={tvDetails} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(tvDetails.backdropPath)}>
				<Hero
					title={tvDetails.name}
					metadataDetailsArray={[
						tvDetails.genre,
						tvDetails.firstAirDate.split('-')[0],
						tvDetails.episodeRunTime ? tvDetails.episodeRunTime + ' mins' : null,
						tvDetails.numberOfSeasons + ' seasons',
					]}
					overview={tvDetails.overview}
					id={tvDetails.id}
					mediaType={tvDetails.mediaType}
					contentRating={tvDetails.contentRating}
				>
					<p>Text</p>
				</Hero>
				<div className="pb-nav flex flex-col items-center gap-3 bg-system-primary-light py-3 dark:bg-system-primary-dark">
					{tvDetails.downloads && (
						<>
							<DownloadStatus downloads={tvDetails.downloads} />
							<Seperator className="px-4" />
						</>
					)}

					<SectionTemplate>
						<SeasonSelector seasons={tvDetails.seasons} />
						<SnapCarousel>
							{season.episodes.map((episode: Episode) => (
								<MediaCard
									key={episode.id}
									className="w-[calc(66%)]"
									heading={`Episode ${episode.episodeNumber}`}
									title={episode.title}
									imageUrl={CreateBackdropUrl(episode.stillPath)}
								>
									<p className="line-clamp-3 w-full text-left text-footnote text-label-secondary-light dark:text-label-secondary-dark">
										{episode.overview}
									</p>
								</MediaCard>
							))}
						</SnapCarousel>
						<Seperator className="px-4" />
					</SectionTemplate>

					{similarMedia[0] && (
						<SectionTemplate heading={'Similar'}>
							<SnapCarousel>
								{similarMedia.map((media: Series) => (
									<MediaCard
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
								{recommendedMedia.map((media: Series) => (
									<MediaCard
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
							{tvDetails.cast.slice(0, 25).map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</SnapCarousel>
						<Seperator className="px-4" />
					</SectionTemplate>
					<SectionTemplate heading={'Information'}>
						<InformationItem title={'Network'} value={tvDetails.network} />
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
