import { MediaType, Movie, Series } from '@/app/typess';
import { CreateBackdropUrl, CreatePosterUrl } from '@/app/utils';
import Card from '@/components/Card';
import Section from '@/components/Section';
import { useState, useRef } from 'react';

type RequestProps = {
	movie?: Movie;
	series?: Series;
	backdropHeight?: number;
};

export default function Request({ movie, series, backdropHeight }: RequestProps) {
	const [isVisable, setIsVisable] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const title = movie?.metadata.title || series?.metadata.name;
	const backdropPath = movie?.metadata.backdropPath || series?.metadata.backdropPath;
	const backdropUrl = CreateBackdropUrl(backdropPath);
	const posterPath = movie?.metadata.posterPath || series?.metadata.posterPath;
	const posterUrl = CreatePosterUrl(posterPath);
	const [requesting, setRequesting] = useState(false);

	const [scaleFactor, setScaleFactor] = useState(1);

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const currentPosition = event.currentTarget.scrollTop;
		if (currentPosition < 0) {
			const scaleFactor = 1 - currentPosition / backdropHeight;
			setScaleFactor(scaleFactor);
		}
	};

	return (
		<>
			<button
				className="flex w-1/2 items-center justify-center gap-2 rounded-lg border border-system-indigo-dark bg-system-indigo-light/80 p-3 shadow-sm"
				onClick={() => setIsVisable(!isVisable)}
			>
				<p className="text-subheadline-emphasized">Request</p>
			</button>
			<div
				className="fixed left-0 top-0 z-40 h-screen w-full animate-fade flex-col items-center justify-center gap-2 bg-system-secondary-light dark:bg-system-secondary-dark"
				style={{ display: isVisable ? 'flex' : 'none' }}
			>
				<div
					className="pb-safe no-scrollbar flex h-full w-full flex-col items-center justify-between overflow-auto overscroll-contain"
					onScroll={handleScroll}
					ref={scrollContainerRef}
				>
					<div className="flex w-full flex-col pb-4">
						<div
							className="flex flex-col justify-end bg-gradient-to-t from-system-secondary-light to-transparent bg-cover bg-center px-4 dark:from-system-secondary-dark"
							style={{ height: backdropHeight }}
						/>
						<div className="flex flex-col gap-2 bg-system-secondary-light p-4 px-4 dark:bg-system-secondary-dark">
							<div className="flex flex-col">
								<p
									className={`text-large-title-emphasized ${
										requesting ? 'text-system-orange-light' : 'text-system-indigo-light'
									} transition-colors duration-1000 ease-in`}
								>
									Request {movie ? 'Movie' : 'Series'}
								</p>
								<p className="text-large-title-emphasized">{title}</p>
							</div>

							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Server</p>
								<div className="relative">
									<Card className="w-full flex-row items-center justify-between rounded-lg bg-system-secondary-light p-3 dark:bg-system-secondary-dark">
										<p className="text-body">Radarr(Default)</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											className="h-4 w-4 stroke-label-secondary-light dark:stroke-label-secondary-dark"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m19.5 8.25-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</Card>
									<select className="absolute inset-0 h-full w-full cursor-pointer opacity-0">
										<option>Radarr</option> <option>Sonarr</option> <option>Custom</option>
									</select>
								</div>
							</div>
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Server</p>
								<div className="relative">
									<Card className="w-full flex-row items-center justify-between rounded-lg bg-system-secondary-light p-3 dark:bg-system-secondary-dark">
										<p className="text-body">Radarr(Default)</p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2}
											className="h-4 w-4 stroke-label-secondary-light dark:stroke-label-secondary-dark"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m19.5 8.25-7.5 7.5-7.5-7.5"
											/>
										</svg>
									</Card>
									<select className="absolute inset-0 h-full w-full cursor-pointer opacity-0">
										<option>Radarr</option> <option>Sonarr</option> <option>Custom</option>
									</select>
								</div>
							</div>
							<div className="flex w-full gap-2 pt-4">
								<button
									className="z-30 flex w-1/2 items-center justify-center gap-2 rounded-lg border border-fill-tetiary-light bg-fill-tetiary-light shadow-sm dark:border-fill-tetiary-dark dark:bg-fill-tetiary-dark"
									onClick={() => {
										setIsVisable(!isVisable);
										scrollContainerRef.current?.scrollTo(0, 0);
									}}
								>
									<p className="text-body">Cancel</p>
								</button>
								<button
									className="z-30 flex w-1/2 items-center justify-center gap-2 rounded-lg border border-system-indigo-dark bg-system-indigo-light/80 p-2 shadow-sm"
									onClick={() => setRequesting(true)}
								>
									<p className="text-body">Request</p>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					className="fixed top-0 -z-10 w-full bg-cover bg-center"
					style={{
						backgroundImage: `url(${backdropUrl}`,
						height: backdropHeight,
						transformOrigin: 'top',
						transform: `scale(${scaleFactor})`,
						transition: 'transform linear',
					}}
				/>
			</div>
		</>
	);
}
