'use client';

import { GetMovie, GetRecommendedMovies, GetSimilarMovies } from '@/app/actions';
import { Movie, Cast, MediaStatus } from '@/app/types';
import { CreateBackdropUrl, FormatDuration, FormatReleaseDate } from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import StatusButton from '@/components/MovieStatusButton';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';
import SnapCarousel from '@/components/SnapCarousel';
import CastMember from '@/components/media/CastMember';
import Hero from '@/components/media/Hero';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function MoviePage() {
	const params = useParams<{ id: string }>();

	const [movie, setMovie] = useState<Movie | null>(null);
	const [recommendedMedia, setRecommendedMedia] = useState<Movie[]>([]);
	const [similarMedia, setSimilarMedia] = useState<Movie[]>([]);

	const router = useRouter();

	useEffect(() => {
		async function fetchData() {
			const movie: Movie = await GetMovie(parseInt(params.id));
			const recommendedMedia = await GetRecommendedMovies(movie.id);
			const similarMedia = await GetSimilarMovies(movie.id);

			setMovie(movie);
			setRecommendedMedia(recommendedMedia);
			setSimilarMedia(similarMedia);
		}
		fetchData();
	}, [params.id]);

	if (!movie) {
		return null;
	}

	return (
		<div className="flex h-full w-full animate-fade">
			<SaveToRecentSearches movie={movie} />
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movie.backdropPath)}>
				<Hero
					title={movie.title}
					metadataDetailsArray={[
						movie.genre,
						movie.releaseDate.split('-')[0],
						FormatDuration(movie.runtime),
					]}
					status={movie.requestStatus}
					overview={movie.overview}
					criticsRating={movie.criticsRating}
					contentRating={movie.contentRating}
					file={movie.file}
				>
					<StatusButton movie={movie} />
				</Hero>

				<div className="pb-nav flex flex-col gap-3 bg-system-primary-light py-3 dark:bg-system-primary-dark">
					{movie.relatedVideos[0] && (
						<SectionTemplate heading={'Videos'}>
							<SnapCarousel>
								{movie.relatedVideos?.map((video) => (
									<MediaCard
										key={video.name}
										title={video.name}
										detailsArray={[video.type]}
										imageUrl={'http://i3.ytimg.com/vi/' + video.key + '/hqdefault.jpg'}
										className="w-[calc(66%)]"
										href={video.url}
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{similarMedia[0] && (
						<SectionTemplate heading={'Similar'}>
							<SnapCarousel>
								{similarMedia.map((media: Movie) => (
									<button
										key={media.id}
										onClick={() => router.replace('/app/' + media.mediaType + '/' + media.id)}
										className="w-[calc(50%-6px)] flex-shrink-0"
									>
										<MediaCard
											title={media.title}
											detailsArray={[media.releaseDate?.split('-')[0]]}
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
								{recommendedMedia.map((media: Movie) => (
									<button
										key={media.id}
										onClick={() => router.replace('/app/' + media.mediaType + '/' + media.id)}
										className="w-[calc(50%-6px)] flex-shrink-0"
									>
										<MediaCard
											title={media.title}
											detailsArray={[media.releaseDate?.split('-')[0]]}
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
					{movie.cast[0] && (
						<SectionTemplate heading={'Cast'}>
							<SnapCarousel>
								{movie.cast.map((cast: Cast) => (
									<CastMember key={cast.id} cast={cast} />
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{movie.collection && (
						<SectionTemplate heading={'Collection'}>
							<SnapCarousel>
								<button
									onClick={() => router.replace('/app/collection/' + movie.collection?.id)}
									className="w-[calc(66%)] flex-shrink-0"
								>
									<MediaCard
										key={movie.collection.id}
										title={movie.collection.name}
										imageUrl={CreateBackdropUrl(movie.collection.backdropPath)}
									/>
								</button>
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					<SectionTemplate heading={'Information'}>
						<InformationItem
							title={'Production Company'}
							value={movie.productionCompany ? <>{movie.productionCompany}</> : <>Unknown</>}
						/>
						<InformationItem
							title={'Release Date'}
							value={movie.releaseDate ? <>{FormatReleaseDate(movie.releaseDate)}</> : <>Unknown</>}
						/>
						<InformationItem
							title={'Run Time'}
							value={movie.runtime ? <>{FormatDuration(movie.runtime)}</> : <>Unknown</>}
						/>
						<InformationItem
							title={'Budget'}
							value={movie.budget ? <>${movie.budget?.toLocaleString()}</> : <>Unknown</>}
						/>
						<InformationItem
							title={'Revenue'}
							value={movie.revenue ? <>${movie.revenue?.toLocaleString()}</> : <>Unknown</>}
						/>
					</SectionTemplate>
					{movie.file && (
						<SectionTemplate heading={'Languages'}>
							<InformationItem
								title={'Audio'}
								value={
									Array.from(new Set(movie.file.audios.map((audio) => audio.language))).join(
										', ',
									) || 'None'
								}
							/>

							<InformationItem
								title={'Subtitles'}
								value={
									Array.from(
										new Set(movie.file.subtitles.map((subtitle) => subtitle.language)),
									).join(', ') || 'None'
								}
							/>
						</SectionTemplate>
					)}
				</div>
			</ScrollTrackingBackdrop>
		</div>
	);
}
