import Card from '../Common/Card';
import PosterCard from '../Common/PosterCard';
import ToggleButton from '../Common/Toggle';
import { getArrServers, getArrServer, getUsers, postRequest, getCurrentUser } from '@/app/actions';
import { MediaType } from '@/app/types';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import Separator from '@/components/Common/Separator';
import { Collection } from '@/services/overseerr/types/collection';
import { MediaStatus, ServiceProfile } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { RadarrSettings } from '@/services/overseerr/types/radarr';
import { MovieResult } from '@/services/overseerr/types/search';
import { TvDetails } from '@/services/overseerr/types/tv';
import { User } from '@/services/overseerr/types/user';
import { useState, useRef, useEffect } from 'react';
import { Fragment } from 'react';
import useSWR from 'swr';

type RequestProps = {
	mediaType: MediaType;
	id: number;
	title: string;
	mediaDetails: MovieDetails | TvDetails | Collection;
	backdropUrl?: string;
	backdropHeight: number;
	closeFunction: () => void;
};

export default function Request({
	id,
	title,
	mediaType,
	mediaDetails,
	backdropUrl,
	backdropHeight,
	closeFunction,
}: RequestProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [requesting, setRequesting] = useState(false);

	const { data: arrServers } = useSWR('arrServers', () => getArrServers(MediaType.MOVIE));

	const [activeServer, setActiveServer] = useState<RadarrSettings | null>(null);
	const [arrProfiles, setArrProfiles] = useState<ServiceProfile[] | null>(null);
	const [activeProfile, setActiveProfile] = useState<ServiceProfile | null>(null);
	const [activeUser, setActiveUser] = useState<User | null>(null);
	const [selectedMovies, setSelectedMovies] = useState<(MovieDetails | MovieResult)[]>([]);

	const [scaleFactor, setScaleFactor] = useState(1);

	const { data: currentUser } = useSWR('currentUser', getCurrentUser);
	const { data: users } = useSWR('users', getUsers);

	useEffect(() => {
		if (arrServers) {
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
		if (activeServer) {
			getArrServer(MediaType.MOVIE, activeServer.id).then((server) => {
				setArrProfiles(server.profiles);

				server.profiles.map((profile) => {
					if (activeServer.activeProfileId === profile.id) {
						setActiveProfile(profile);
					} else {
						setActiveProfile(server.profiles[0]);
					}
				});
			});
		}
	}, [activeServer]);

	useEffect(() => {
		if (currentUser && users) {
			const user = users.results.find((user) => user.id === currentUser.id);
			if (!user) {
				setActiveUser(users.results[0]);
			}
			setActiveUser(user);
		}
	}, [currentUser, users]);

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const currentPosition = event.currentTarget.scrollTop;
		if (currentPosition < 0) {
			const scaleFactor = 1 - currentPosition / backdropHeight;
			setScaleFactor(scaleFactor);
		}
	};

	const movies: (MovieDetails | MovieResult)[] = [];

	if ('parts' in mediaDetails) {
		mediaDetails.parts.map((part) => {
			movies.push(part);
		});
	} else {
		if ('releaseDate' in mediaDetails) {
			movies.push(mediaDetails);
		}
	}

	const unrequestedMovies = movies.filter((movie) => !movie.mediaInfo);

	const handleSelectAllMovies = () => {
		if (selectedMovies.length === unrequestedMovies.length) {
			setSelectedMovies([]);
		} else {
			setSelectedMovies(unrequestedMovies);
		}
	};

	const handleRequest = async () => {
		if (selectedMovies.length > 0) {
			setRequesting(true);
			selectedMovies.map(async (movie) => {
				await postRequest(
					MediaType.MOVIE,
					movie.id,
					activeServer.id,
					activeProfile.id,
					activeUser.id,
				);
			});
		}
	};

	if (!arrServers || !arrProfiles || !users) {
		return null;
	}

	return (
		<div className="fixed z-40 flex h-screen w-screen animate-fade bg-system-secondary-light dark:bg-system-secondary-dark">
			<div
				id="scroll-container"
				className="no-scrollbar pb-safe flex w-full flex-col justify-between overflow-auto"
				onScroll={handleScroll}
			>
				<span
					className="w-full flex-shrink-0 bg-gradient-to-b from-transparent to-system-secondary-light dark:to-system-secondary-dark"
					style={{ height: backdropHeight }}
				/>
				<div className="flex h-fit w-full flex-col justify-between gap-4 bg-system-secondary-light px-4 dark:bg-system-secondary-dark">
					<div className="flex flex-col bg-system-secondary-light dark:bg-system-secondary-dark">
						<p
							className={`text-title-1-emphasized ${
								requesting ? 'text-system-orange-light' : 'text-system-indigo-light'
							} transition-colors duration-1000 ease-in`}
						>
							Request {mediaType === MediaType.MOVIE ? 'Movie' : 'Series'}
						</p>
						<p className="text-large-title-emphasized">{title}</p>
					</div>

					{movies.length >= 1 && (
						<Card className="flex w-full flex-col rounded-lg bg-system-tertiary-light dark:bg-system-tertiary-dark">
							{movies.length > 1 && (
								<div className="flex w-full flex-col items-center">
									<div className="flex w-full items-center justify-between gap-2 p-3 py-2.5">
										<p className="text-body-emphasized">Select All</p>
										<p>{selectedMovies.length === unrequestedMovies.length ? 'true' : 'false'}</p>
										<ToggleButton
											toggled={selectedMovies.length === unrequestedMovies.length ? true : false}
											disabled={unrequestedMovies.length === 0}
											color="bg-system-indigo-light dark:bg-system-indigo-dark"
											onToggle={() => {
												handleSelectAllMovies();
											}}
										/>
									</div>
									<Separator />
								</div>
							)}
							{movies.map((movie, index) => (
								<Fragment key={movie.id}>
									<div className="flex w-full items-center gap-2 p-3 py-2.5">
										<PosterCard
											id={movie.id}
											posterPath={movie.posterPath}
											title={movie.title}
											mediaType={MediaType.MOVIE}
											className="w-16 rounded-md border-none"
										/>

										<div className="flex w-full flex-col">
											{movie.releaseDate && (
												<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
													{movie.releaseDate.split('-')[0]}
												</p>
											)}
											<p className="text-body-emphasized">{movie.title}</p>
										</div>
										<p>{selectedMovies.includes(movie) ? 'true' : 'false'}</p>
										<ToggleButton
											toggled={selectedMovies.includes(movie) || movie.mediaInfo ? true : false}
											color={
												movie.mediaInfo?.status === MediaStatus.AVAILABLE
													? ''
													: 'bg-system-indigo-light dark:bg-system-indigo-dark'
											}
											disabled={movie.mediaInfo ? true : false}
											onToggle={() => {
												if (selectedMovies.includes(movie)) {
													setSelectedMovies(
														selectedMovies.filter((selected) => selected !== movie),
													);
												} else {
													setSelectedMovies([...selectedMovies, movie]);
												}
											}}
										/>
									</div>
									{index !== movies.length - 1 && <Separator />}
								</Fragment>
							))}
						</Card>
					)}

					<div className="flex flex-col gap-2">
						{activeServer && (
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Server</p>
								<Dropdown
									value={activeServer.name}
									valueText={activeServer.is4k ? activeServer.name + ' 4K' : activeServer.name}
									onChange={(event) => {
										const selectedServerName = event.target.value;
										const selectedServer =
											arrServers.find((server) => server.name === selectedServerName) ||
											arrServers[0];
										setActiveServer(selectedServer);
									}}
									options={arrServers.map((server) => (
										<option key={server.id}>{server.name}</option>
									))}
								/>
							</div>
						)}

						{activeProfile && (
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Profile</p>
								<Dropdown
									value={activeProfile.name}
									onChange={(event) => {
										const selectedProfileName = event.target.value;
										const selectedProfile =
											arrProfiles.find((profile) => profile.name === selectedProfileName) ||
											arrServers[0];
										setActiveProfile(selectedProfile);
									}}
									options={arrProfiles.map((profile) => (
										<option key={profile.id}>{profile.name}</option>
									))}
								/>
							</div>
						)}

						{activeUser && (
							<div className="flex w-full flex-col gap-2">
								<p className="text-body-emphasized">Request As</p>
								<Dropdown
									value={activeUser.displayName}
									onChange={(event) => {
										const selectedUserName = event.target.value;
										const selectedUser =
											users.results.find((user) => user.displayName === selectedUserName) ||
											users.results[0];
										setActiveUser(selectedUser);
									}}
									options={users.results.map((user) => (
										<option key={user.id}>{user.displayName}</option>
									))}
								/>
							</div>
						)}

						<div
							className="pb-safe
                             flex w-full gap-4 pt-2"
						>
							<Button
								className="w-full bg-system-tertiary-light dark:bg-system-tertiary-dark"
								onClick={() => {
									closeFunction();
									setRequesting(false);
									scrollContainerRef.current?.scrollTo(0, 0);
								}}
							>
								<p className="text-subheadline-emphasized">Cancel</p>
							</Button>
							<Button
								className="w-full border-none bg-system-indigo-light text-label-primary-dark dark:bg-system-indigo-dark"
								onClick={async () => {
									handleRequest();
								}}
								disabled={
									selectedMovies.length === 0 || !activeServer || !activeProfile || !activeUser
								}
							>
								<p className="text-subheadline-emphasized">Request</p>
							</Button>
						</div>
					</div>
				</div>
			</div>

			<span
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
