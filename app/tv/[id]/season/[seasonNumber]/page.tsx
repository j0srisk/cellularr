'use client';

import { GetSeason, GetSeries, GetRecommendedSeries, GetSimilarSeries } from '@/app/actions';
import { Cast, Episode, Series, MediaStatus, Season, MediaType } from '@/app/types';
import { CreateBackdropUrl, FormatReleaseDate } from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import SnapCarousel from '@/components/SnapCarousel';
import CastMember from '@/components/media/CastMember';
import Hero from '@/components/media/Hero';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SeasonSelector from '@/components/media/SeasonSelector';
import SectionTemplate from '@/components/media/SectionTemplate';
import StatusButton from '@/components/media/SeriesStatusButton';
import Seperator from '@/components/ui/Seperator';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Page() {
	const params = useParams<{ id: string; seasonNumber: string }>();
	const [tvDetails, setTvDetails] = useState<Series | null>(null);
	const [recommendedMedia, setRecommendedMedia] = useState<Series[]>([]);
	const [similarMedia, setSimilarMedia] = useState<Series[]>([]);
	const [season, setSeason] = useState<Season | null>(null);

	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const tvDetails: Series = await GetSeries(parseInt(params.id));
			const recommendedMedia = await GetRecommendedSeries(tvDetails.id);
			const similarMedia = await GetSimilarSeries(tvDetails.id);
			const season = await GetSeason(tvDetails.id, parseInt(params.seasonNumber));

			setTvDetails(tvDetails);

			setRecommendedMedia(recommendedMedia);
			setSimilarMedia(similarMedia);
			setSeason(season ? season : null);
		}
		fetchData();
	}, [params.seasonNumber, params.id]);

	if (!tvDetails || !season) {
		return null;
	}

	return (
		<div className="flex h-full w-full animate-fade">
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
					status={tvDetails.requestStatus}
					overview={tvDetails.overview}
					criticsRating={tvDetails.criticsRating}
					contentRating={tvDetails.contentRating}
				>
					<StatusButton series={tvDetails} />
				</Hero>
				<div className="pb-nav flex flex-col items-center gap-3 bg-system-primary-light py-3 dark:bg-system-primary-dark">
					<SectionTemplate>
						<SeasonSelector seasons={tvDetails.seasons} />
						<SnapCarousel>
							{season.episodes.map((episode: Episode) => (
								<div key={episode.id} className="w-[calc(66%)] flex-shrink-0">
									<MediaCard
										heading={`Episode ${episode.episodeNumber}`}
										title={episode.title}
										imageUrl={CreateBackdropUrl(episode.stillPath)}
									>
										<p className="line-clamp-3 w-full text-left text-footnote text-label-secondary-light dark:text-label-secondary-dark">
											{episode.overview}
										</p>
									</MediaCard>
								</div>
							))}
						</SnapCarousel>
						<Seperator className="px-4" />
					</SectionTemplate>

					{similarMedia[0] && (
						<SectionTemplate heading={'Similar'}>
							<SnapCarousel>
								{similarMedia.map((media: Series) => (
									<button
										key={media.id}
										onClick={() => router.replace('/' + media.mediaType + '/' + media.id)}
										className="w-[calc(50%-6px)] flex-shrink-0"
									>
										<MediaCard
											title={media.name}
											detailsArray={[media.firstAirDate?.split('-')[0]]}
											imageUrl={CreateBackdropUrl(media.backdropPath)}
											iconUrl={
												media.requestStatus === MediaStatus.AVAILABLE ||
												media.requestStatus === MediaStatus.PARTIALLY_AVAILABLE
													? 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/plex.svg'
													: null
											}
										/>
									</button>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}

					{recommendedMedia[0] && (
						<SectionTemplate heading={'Recommended'}>
							<SnapCarousel>
								{recommendedMedia.map((media: Series) => (
									<button
										key={media.id}
										onClick={() => router.replace('/' + media.mediaType + '/' + media.id)}
										className="w-[calc(50%-6px)] flex-shrink-0"
									>
										<MediaCard
											title={media.name}
											detailsArray={[media.firstAirDate?.split('-')[0]]}
											imageUrl={CreateBackdropUrl(media.backdropPath)}
											iconUrl={
												media.requestStatus === MediaStatus.AVAILABLE ||
												media.requestStatus === MediaStatus.PARTIALLY_AVAILABLE
													? 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/plex.svg'
													: null
											}
										/>
									</button>
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
		</div>
	);
}
