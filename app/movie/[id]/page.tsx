import { MovieDetails, MediaStatus, MediaType, Cast } from '@/app/types';
import { CreatePosterUrl, CreateBackdropUrl } from '@/app/utils';
import CastMember from '@/components/CastMember';
import Heading from '@/components/Heading';
import PlayButton from '@/components/PlayButton';
import Poster from '@/components/Poster';
import ProcessingButton from '@/components/ProcessingButton';
import RequestButton from '@/components/RequestButton';
import SaveToRecentSearches from '@/components/SaveToRecentSearches';

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const overseerrResponse = await fetch('http://localhost:3000/api/overseerr/movie/' + id, {
		cache: 'no-cache',
	});

	const movieDetails: MovieDetails = await overseerrResponse.json();

	//set the mediaType to movie because MovieDetails doesn't return a mediaType
	movieDetails.mediaType = MediaType.MOVIE;

	console.log(movieDetails.mediaInfo?.status);

	const posterUrl = CreatePosterUrl(movieDetails.posterPath);

	const runTimeHours = movieDetails.runtime ? Math.floor(movieDetails.runtime / 60) : 0;

	const runTimeMinutes = movieDetails.runtime ? movieDetails.runtime % 60 : 0;

	return (
		<>
			<SaveToRecentSearches movieDetails={movieDetails} />
			<div className="flex h-full flex-col gap-8 overflow-y-scroll">
				<div
					style={
						{
							'--image-url': `url(${CreateBackdropUrl(movieDetails.backdropPath)})`,
						} as React.CSSProperties
					}
					className="flex h-[66vh] w-full flex-shrink-0 items-end bg-[image:var(--image-url)] bg-cover bg-center"
				>
					<div className="flex h-fit w-full flex-col items-center justify-center gap-1 bg-gradient-to-b from-transparent to-black pt-20">
						<p className="px-2 text-center text-3xl font-black">{movieDetails.title}</p>
						<div className="flex w-2/3 flex-col gap-2">
							<div className="flex w-full items-center justify-center gap-1 text-xs font-black text-neutral-400">
								{movieDetails.genres && (
									<>
										<p>{movieDetails.genres[0].name}</p>
										<p>•</p>
									</>
								)}
								<p>{movieDetails.releaseDate?.split('-')[0]}</p>
								<p>•</p>
								{movieDetails.runtime && (
									<>
										{runTimeHours > 0 && (
											<p>
												{runTimeHours} hr
												{runTimeHours > 1 ? 's' : ''}
											</p>
										)}

										{runTimeMinutes > 0 && (
											<p>
												{runTimeMinutes} min
												{runTimeMinutes > 1 ? 's' : ''}
											</p>
										)}
									</>
								)}
							</div>
							<button className="flex  h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-5 w-5"
								>
									<path
										fillRule="evenodd"
										d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
										clipRule="evenodd"
									/>
								</svg>

								<p className="text-lg font-black">Play on Plex</p>
							</button>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 px-4">
					<p className="text-sm font-black text-white">{movieDetails.overview}</p>
				</div>
				<div className="flex flex-col gap-2">
					<p className="px-4 text-2xl font-black text-white">Cast</p>
					<div className="flex gap-2 overflow-scroll px-4">
						{movieDetails.credits?.cast.map((cast: Cast) => (
							<CastMember key={cast.id} cast={cast} />
						))}
					</div>
				</div>
				<div className="mb-4 flex hidden flex-col gap-8 px-4">
					<div className="flex items-end justify-start gap-4 ">
						<div className="flex flex-col items-center justify-center gap-4">
							<div className="aspect-[2/3] h-56">
								<Poster url={CreatePosterUrl(movieDetails.posterPath)} alt={movieDetails.title} />
							</div>
						</div>
						<div className="flex h-3/4 w-full flex-col justify-between gap-4 py-4">
							{!movieDetails.mediaInfo && <RequestButton moviedetails={movieDetails} />}
							{movieDetails.mediaInfo?.status === MediaStatus.UNKNOWN && (
								<RequestButton moviedetails={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PROCESSING && (
								<ProcessingButton movieDetails={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PENDING && (
								<ProcessingButton movieDetails={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.PARTIALLY_AVAILABLE && (
								<PlayButton movieDetails={movieDetails} />
							)}
							{movieDetails.mediaInfo?.status === MediaStatus.AVAILABLE && (
								<PlayButton movieDetails={movieDetails} />
							)}

							<div className="flex w-full items-center justify-around gap-2 font-semibold">
								<div className="flex items-center gap-2">
									<svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
										<path
											d="M478.29 296.98c-3.99-63.966-36.52-111.82-85.468-138.58.278 1.56-1.109 3.508-2.688 2.818-32.016-14.006-86.328 31.32-124.28 7.584.285 8.519-1.378 50.072-59.914 52.483-1.382.056-2.142-1.355-1.268-2.354 7.828-8.929 15.732-31.535 4.367-43.586-24.338 21.81-38.472 30.017-85.138 19.186-29.878 31.241-46.809 74-43.485 127.26 6.78 108.74 108.63 170.89 211.19 164.49 102.56-6.395 193.47-80.572 186.68-189.31"
											fill="#FA320A"
										></path>
										<path
											d="M291.375 132.293c21.075-5.023 81.693-.49 101.114 25.274 1.166 1.545-.475 4.468-2.355 3.648-32.016-14.006-86.328 31.32-124.282 7.584.285 8.519-1.378 50.072-59.914 52.483-1.382.056-2.142-1.355-1.268-2.354 7.828-8.929 15.73-31.535 4.367-43.586-26.512 23.758-40.884 31.392-98.426 15.838-1.883-.508-1.241-3.535.762-4.298 10.876-4.157 35.515-22.361 58.824-30.385 4.438-1.526 8.862-2.71 13.18-3.4-25.665-2.293-37.235-5.862-53.559-3.4-1.789.27-3.004-1.813-1.895-3.241 21.995-28.332 62.513-36.888 87.512-21.837-15.41-19.094-27.48-34.321-27.48-34.321l28.601-16.246s11.817 26.4 20.414 45.614c21.275-31.435 60.86-34.336 77.585-12.033.992 1.326-.045 3.21-1.702 3.171-13.612-.331-21.107 12.05-21.675 21.466l.197.023"
											fill="#00912D"
										></path>
									</svg>
									100%
								</div>
								<div className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 190.24 81.52"
										className="mr-1 w-8"
									>
										<defs>
											<linearGradient
												id="tmdb_logo_svg__a"
												y1="40.76"
												x2="190.24"
												y2="40.76"
												gradientUnits="userSpaceOnUse"
											>
												<stop offset="0" stopColor="#90cea1"></stop>
												<stop offset="0.56" stopColor="#3cbec9"></stop>
												<stop offset="1" stopColor="#00b3e5"></stop>
											</linearGradient>
										</defs>
										<path
											d="M105.67 36.06h66.9a17.67 17.67 0 0 0 17.67-17.66A17.67 17.67 0 0 0 172.57.73h-66.9A17.67 17.67 0 0 0 88 18.4a17.67 17.67 0 0 0 17.67 17.66zm-88 45h76.9a17.67 17.67 0 0 0 17.67-17.66 17.67 17.67 0 0 0-17.67-17.67h-76.9A17.67 17.67 0 0 0 0 63.4a17.67 17.67 0 0 0 17.67 17.66zm-7.26-45.64h7.8V6.92h10.1V0h-28v6.9h10.1zm28.1 0h7.8V8.25h.1l9 27.15h6l9.3-27.15h.1V35.4h7.8V0H66.76l-8.2 23.1h-.1L50.31 0h-11.8zm113.92 20.25a15.07 15.07 0 0 0-4.52-5.52 18.57 18.57 0 0 0-6.68-3.08 33.54 33.54 0 0 0-8.07-1h-11.7v35.4h12.75a24.58 24.58 0 0 0 7.55-1.15 19.34 19.34 0 0 0 6.35-3.32 16.27 16.27 0 0 0 4.37-5.5 16.91 16.91 0 0 0 1.63-7.58 18.5 18.5 0 0 0-1.68-8.25zM145 68.6a8.8 8.8 0 0 1-2.64 3.4 10.7 10.7 0 0 1-4 1.82 21.57 21.57 0 0 1-5 .55h-4.05v-21h4.6a17 17 0 0 1 4.67.63 11.66 11.66 0 0 1 3.88 1.87A9.14 9.14 0 0 1 145 59a9.87 9.87 0 0 1 1 4.52 11.89 11.89 0 0 1-1 5.08zm44.63-.13a8 8 0 0 0-1.58-2.62 8.38 8.38 0 0 0-2.42-1.85 10.31 10.31 0 0 0-3.17-1v-.1a9.22 9.22 0 0 0 4.42-2.82 7.43 7.43 0 0 0 1.68-5 8.42 8.42 0 0 0-1.15-4.65 8.09 8.09 0 0 0-3-2.72 12.56 12.56 0 0 0-4.18-1.3 32.84 32.84 0 0 0-4.62-.33h-13.2v35.4h14.5a22.41 22.41 0 0 0 4.72-.5 13.53 13.53 0 0 0 4.28-1.65 9.42 9.42 0 0 0 3.1-3 8.52 8.52 0 0 0 1.2-4.68 9.39 9.39 0 0 0-.55-3.18zm-19.42-15.75h5.3a10 10 0 0 1 1.85.18 6.18 6.18 0 0 1 1.7.57 3.39 3.39 0 0 1 1.22 1.13 3.22 3.22 0 0 1 .48 1.82 3.63 3.63 0 0 1-.43 1.8 3.4 3.4 0 0 1-1.12 1.2 4.92 4.92 0 0 1-1.58.65 7.51 7.51 0 0 1-1.77.2h-5.65zm11.72 20a3.9 3.9 0 0 1-1.22 1.3 4.64 4.64 0 0 1-1.68.7 8.18 8.18 0 0 1-1.82.2h-7v-8h5.9a15.35 15.35 0 0 1 2 .15 8.47 8.47 0 0 1 2.05.55 4 4 0 0 1 1.57 1.18 3.11 3.11 0 0 1 .63 2 3.71 3.71 0 0 1-.43 1.92z"
											fill="url(#tmdb_logo_svg__a)"
										></path>
									</svg>
									100%
								</div>
							</div>

							<div className="flex w-full items-center justify-center gap-2  text-white">
								<p className="hidden rounded-md border-2 px-1 text-xs font-bold">PG</p>
								<p className="text-sm">{movieDetails.runtime} minutes</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col justify-start gap-4">
						{movieDetails.tagline && (
							<p className="w-full text-center text-xl italic text-white opacity-60">
								{movieDetails.tagline}
							</p>
						)}
						<div className="flex w-full flex-col justify-between gap-2">
							<p className="text-xl font-bold text-white">Overview</p>
							<p className="text-sm text-white opacity-60">{movieDetails.overview}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
