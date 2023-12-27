import { Movie, Cast } from '@/app/types';
import {
	CreateBackdropUrl,
	FormatDuration,
	FormatReleaseDate,
	GetMovie,
	GetRecommendedMedia,
	GetSimilarMedia,
} from '@/app/utils';
import MediaCard from '@/components/MediaCard';
import SnapCarousel from '@/components/SnapCarousel';
import CastMember from '@/components/media/CastMember';
import Hero from '@/components/media/Hero';
import InformationItem from '@/components/media/InformationItem';
import ScrollTrackingBackdrop from '@/components/media/ScrollTrackingBackdrop';
import SectionTemplate from '@/components/media/SectionTemplate';
import Button from '@/components/ui/Button';
import Seperator from '@/components/ui/Seperator';

export default async function Page({ params }: { params: { id: number } }) {
	//gets movie from overseerr/tautulli based on the id in the url
	const movie: Movie = await GetMovie(params.id);

	//gets recommended media from overseerr
	const recommendedMedia = await GetRecommendedMedia(movie.mediaType, movie.id);

	//gets similar media from overseerr
	const similarMedia = await GetSimilarMedia(movie.mediaType, movie.id);

	return (
		<>
			<ScrollTrackingBackdrop url={CreateBackdropUrl(movie.backdropPath)}>
				<Hero
					title={movie.title}
					metadataDetailsArray={[
						movie.genre,
						movie.releaseDate.split('-')[0],
						FormatDuration(movie.runtime),
					]}
					overview={movie.overview}
					id={movie.id}
					mediaType={movie.mediaType}
					contentRating={movie.contentRating}
					file={movie.file}
				>
					<Button className="bg-white text-system-primary-dark" text="Play" />
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
									<MediaCard
										key={media.id}
										title={media.title}
										detailsArray={[media.releaseDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										href={'/movie/' + media.id}
										className="w-[calc(50%-6px)]"
									/>
								))}
							</SnapCarousel>
							<Seperator className="px-4" />
						</SectionTemplate>
					)}
					{recommendedMedia[0] && (
						<SectionTemplate heading={'Recommended'}>
							<SnapCarousel>
								{recommendedMedia.map((media: Movie) => (
									<MediaCard
										key={media.id}
										title={media.title}
										detailsArray={[media.releaseDate?.split('-')[0]]}
										imageUrl={CreateBackdropUrl(media.backdropPath)}
										href={'/movie/' + media.id}
										className="w-[calc(50%-6px)]"
									/>
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
								<MediaCard
									key={movie.collection.id}
									title={movie.collection.name}
									imageUrl={CreateBackdropUrl(movie.collection.backdropPath)}
									href={'/collection/' + movie.collection.id}
									className="w-[calc(66%)]"
								/>
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
		</>
	);
}
