'use client';

import { MovieDetails, Cast } from '@/app/types';
import { FormatDuration, CreateBackdropUrl } from '@/app/utils';
import CastMember from '@/components/CastMember';
import MediaBackdrop from '@/components/MediaBackdrop';
import MediaDetailsSection from '@/components/MediaDetailsSection';
import { useState } from 'react';

export default function MediaDetails({ movieDetails }: { movieDetails: MovieDetails }) {
	const [scroll, setScroll] = useState(0);
	return (
		<>
			<div
				className="flex h-full flex-col overflow-y-scroll"
				onScroll={(e) => setScroll(e.target.scrollTop)}
			>
				<div className="relative flex h-[66vh] w-full flex-shrink-0 items-end">
					<div className="z-10 flex h-fit w-full flex-col items-center justify-center gap-1 bg-gradient-to-t from-black  to-transparent pb-8 pt-20">
						<p className="px-2 text-center text-3xl font-black">{movieDetails.title}</p>
						<div className="flex w-2/3 flex-col gap-2">
							<div className="flex w-full items-center justify-center gap-1 text-xs font-black text-neutral-400">
								{movieDetails.genres && (
									<>
										<p>{movieDetails.genres[0].name}</p>
									</>
								)}

								{movieDetails.releaseDate && (
									<>
										<p>•</p>
										<p>{movieDetails.releaseDate?.split('-')[0]}</p>
									</>
								)}

								{movieDetails.runtime !== 0 && (
									<>
										<p>•</p>
										<>{FormatDuration(movieDetails.runtime)}</>
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
				<div className="flex flex-col gap-4 bg-black ">
					<MediaDetailsSection>
						<p className="px-4 text-sm font-black text-white">{movieDetails.overview}</p>
					</MediaDetailsSection>
					<MediaDetailsSection heading={'Cast'}>
						<div className="flex gap-3 overflow-x-auto px-4">
							{movieDetails.credits?.cast.map((cast: Cast) => (
								<CastMember key={cast.id} cast={cast} />
							))}
						</div>
					</MediaDetailsSection>
					<MediaDetailsSection heading={'Information'}>
						{movieDetails.productionCompanies && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Production Company</p>
								<p className="text-xs font-black text-neutral-400">
									{movieDetails.productionCompanies[0].name}
								</p>
							</div>
						)}
						{movieDetails.formattedReleaseDate && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Release Date</p>
								<p className="text-xs font-black text-neutral-400">
									{movieDetails.formattedReleaseDate}
								</p>
							</div>
						)}
						{movieDetails.runtime !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Runtime</p>
								<p className="text-xs font-black text-neutral-400">
									{FormatDuration(movieDetails.runtime)}
								</p>
							</div>
						)}
						{movieDetails.budget !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Budget</p>
								<p className="text-xs font-black text-neutral-400">
									${movieDetails.budget?.toLocaleString()}
								</p>
							</div>
						)}
						{movieDetails.revenue !== 0 && (
							<div className="flex flex-col px-4">
								<p className="text-xs font-black text-white">Revenue</p>
								<p className="text-xs font-black text-neutral-400">
									${movieDetails.revenue?.toLocaleString()}
								</p>
							</div>
						)}
					</MediaDetailsSection>
				</div>
				<MediaBackdrop url={CreateBackdropUrl(movieDetails.backdropPath)} scroll={scroll} />
			</div>
		</>
	);
}
