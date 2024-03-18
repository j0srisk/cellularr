import { getArrServers, getArrProfiles, postRequest } from '@/app/actionss';
import { MediaType, Movie, ArrServer, ArrProfile, Series } from '@/app/typess';
import { CreateBackdropUrl, CreatePosterUrl } from '@/app/utils';
import Card from '@/components/Card';
import Section from '@/components/Section';
import { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';

type RequestProps = {
	movie?: Movie;
	series?: Series;
	backdropHeight: number;
	closeFunction: () => void;
};

export default function Request({ movie, series, backdropHeight, closeFunction }: RequestProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const { data: arrServers, isLoading } = useSWR('arrServers', getArrServers);

	const title = movie?.metadata.title || series?.metadata.name;
	const backdropPath = movie?.metadata.backdropPath || series?.metadata.backdropPath;
	const backdropUrl = CreateBackdropUrl(backdropPath);
	const posterPath = movie?.metadata.posterPath || series?.metadata.posterPath;
	const posterUrl = CreatePosterUrl(posterPath);
	const [requesting, setRequesting] = useState(false);
	const [activeServer, setActiveServer] = useState<ArrServer | null>(null);
	const [arrProfiles, setArrProfiles] = useState<ArrProfile[] | null>(null);
	const [activeProfile, setActiveProfile] = useState<ArrProfile | null>(null);

	const [scaleFactor, setScaleFactor] = useState(1);

	useEffect(() => {
		if (arrServers && arrServers.length) {
			arrServers.map((arrServer) => {
				if (arrServer.isDefault === true) {
					setActiveServer(arrServer);
				} else {
					setActiveServer(arrServers[0]);
				}
			});
		}
	}, [arrServers]);

	useEffect(() => {
		const fetchProfiles = async () => {
			if (activeServer) {
				const profiles = await getArrProfiles(activeServer.id);
				const activeProfile =
					profiles.find((profile) => profile.id === activeServer.activeProfileId) || profiles[0];
				setArrProfiles(profiles);
				setActiveProfile(activeProfile);
				console.log(profiles);
				console.log(activeProfile);
			}
		};
		fetchProfiles();
	}, [activeServer]);

	const handleRequest = async () => {
		setRequesting(true);
		const mediaType = movie ? MediaType.MOVIE : MediaType.TV;

		const mediaId = movie ? movie.metadata.id : series?.metadata.id;

		const serverId = activeServer?.id;

		const profileId = activeProfile?.id;

		const requestResponse = await postRequest(mediaType, mediaId, serverId, profileId);
	};

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const currentPosition = event.currentTarget.scrollTop;
		if (currentPosition < 0) {
			const scaleFactor = 1 - currentPosition / backdropHeight;
			setScaleFactor(scaleFactor);
		}
	};

	if (
		isLoading ||
		!arrServers ||
		!arrServers.length ||
		!activeServer ||
		!arrProfiles ||
		!activeProfile
	) {
		return null;
	}

	return (
		<div className="fixed left-0 top-0 z-40 flex h-screen w-full animate-fade flex-col items-center justify-center gap-2 bg-system-secondary-light dark:bg-system-secondary-dark">
			<div
				className="no-scrollbar flex h-full w-full flex-col items-center justify-between overflow-scroll overscroll-contain"
				onScroll={handleScroll}
				ref={scrollContainerRef}
			>
				<div className="flex h-full w-full flex-col">
					<div
						className="flex flex-shrink-0 flex-col justify-end bg-gradient-to-t from-system-secondary-light to-transparent bg-cover bg-center px-4 dark:from-system-secondary-dark"
						style={{ height: backdropHeight }}
					/>
					<div className="flex h-full flex-col justify-between gap-2 bg-system-secondary-light p-4 px-4 dark:bg-system-secondary-dark">
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

						<div className="flex flex-col gap-2">
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Server</p>
								<div className="relative">
									<Card className="w-full flex-row items-center justify-between rounded-lg bg-system-secondary-light p-3 dark:bg-system-secondary-dark">
										<p className="text-body">{activeServer.name}</p>
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
									<select
										className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
										value={activeServer.name}
										onChange={(event) => {
											const selectedServerName = event.target.value;
											const selectedServer =
												arrServers.find((server) => server.name === selectedServerName) ||
												arrServers[0];
											setActiveServer(selectedServer);
										}}
									>
										{arrServers.map((server) => (
											<option key={server.id}>{server.name}</option>
										))}
									</select>
								</div>
							</div>
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Profile</p>
								<div className="relative">
									<Card className="w-full flex-row items-center justify-between rounded-lg bg-system-secondary-light p-3 dark:bg-system-secondary-dark">
										<p className="text-body">{activeProfile.name}</p>
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
									<select
										className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
										value={activeProfile.name}
										onChange={(event) => {
											const selectedProfileName = event.target.value;
											const selectedProfile =
												arrProfiles.find((profile) => profile.name === selectedProfileName) ||
												arrProfiles[0];
											setActiveProfile(selectedProfile);
										}}
									>
										{arrProfiles.map((profile) => (
											<option key={profile.id}>{profile.name}</option>
										))}
									</select>
								</div>
							</div>
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Request As</p>
								<div className="relative">
									<Card className="w-full flex-row items-center justify-between rounded-lg bg-system-secondary-light p-3 dark:bg-system-secondary-dark">
										<p className="text-body">txrisk27</p>
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
									<select
										className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
										value={activeProfile.name}
										onChange={(event) => {
											const selectedProfileName = event.target.value;
											const selectedProfile =
												arrProfiles.find((profile) => profile.name === selectedProfileName) ||
												arrProfiles[0];
											setActiveProfile(selectedProfile);
										}}
									>
										{arrProfiles.map((profile) => (
											<option key={profile.id}>{profile.name}</option>
										))}
									</select>
								</div>
							</div>
							<div
								className="pb-safe
                             flex w-full gap-4 pt-2"
							>
								<button
									className="z-30 flex w-1/2 items-center justify-center gap-2 rounded-lg border border-fill-tetiary-light bg-fill-tetiary-light p-3 shadow-sm dark:border-fill-tetiary-dark dark:bg-fill-tetiary-dark"
									onClick={() => {
										closeFunction();
										setRequesting(false);
										scrollContainerRef.current?.scrollTo(0, 0);
									}}
								>
									<p className="text-body">Cancel</p>
								</button>
								<button
									className={`z-30 flex w-1/2 items-center justify-center gap-2 rounded-lg border ${
										requesting
											? 'border-system-orange-dark bg-system-orange-light'
											: 'border-system-indigo-dark bg-system-indigo-light'
									}  p-3 text-label-primary-dark shadow-sm transition-colors duration-1000 ease-in`}
									onClick={() => handleRequest()}
								>
									{requesting ? (
										<p className="text-body">Requesting...</p>
									) : (
										<p className="text-body">Request</p>
									)}
								</button>
							</div>
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
	);
}
