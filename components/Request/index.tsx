'use client';

import { getArrServers, getArrServer, getUsers, postRequest, getCurrentUser } from '@/app/actions';
import { CombinedSeason, MediaType } from '@/app/types';
import Button from '@/components/Common/Button';
import Dropdown from '@/components/Common/Dropdown';
import MovieSelector from '@/components/Request/MovieSelector';
import SeasonSelector from '@/components/Request/SeasonSelector';
import { Collection } from '@/services/overseerr/types/collection';
import { ServiceProfile } from '@/services/overseerr/types/common';
import { MovieDetails } from '@/services/overseerr/types/movie';
import { RadarrSettings } from '@/services/overseerr/types/radarr';
import { MovieResult } from '@/services/overseerr/types/search';
import { SonarrSettings } from '@/services/overseerr/types/sonarr';
import { TvDetails } from '@/services/overseerr/types/tv';
import { SeasonInfo } from '@/services/overseerr/types/tv';
import { User } from '@/services/overseerr/types/user';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const getMovies = (mediaDetails: MovieDetails | TvDetails | Collection) => {
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

	return movies;
};

const getSeasons = (mediaDetails: MovieDetails | TvDetails | Collection) => {
	const seasons: CombinedSeason[] = [];

	if ('seasons' in mediaDetails) {
		mediaDetails.seasons.map((seasonDetails) => {
			if (seasonDetails.seasonNumber !== 0) {
				let seasonInfo: SeasonInfo | undefined;

				if (mediaDetails.mediaInfo?.seasons) {
					seasonInfo = mediaDetails.mediaInfo?.seasons.find(
						(seasonInfo: SeasonInfo) => seasonInfo.seasonNumber === seasonDetails.seasonNumber,
					);
				}

				const combinedSeason: CombinedSeason = {
					seasonDetails: seasonDetails,
					seasonInfo: seasonInfo,
				};

				seasons.push(combinedSeason);
			}
		});
	}

	return seasons;
};

type RequestProps = {
	mediaType: MediaType;
	mediaDetails: MovieDetails | TvDetails | Collection;
	backdropUrl?: string;
	backdropHeight: number;
};

export default function Request({ mediaType, mediaDetails }: RequestProps) {
	const [requesting, setRequesting] = useState(false);
	const router = useRouter();

	const { data: arrServers } = useSWR(
		mediaType === MediaType.TV ? 'sonarrServers' : 'radarrServers',
		() => getArrServers(mediaType),
	);

	const [activeServer, setActiveServer] = useState<RadarrSettings | SonarrSettings | null>(null);
	const [arrProfiles, setArrProfiles] = useState<ServiceProfile[] | null>(null);
	const [activeProfile, setActiveProfile] = useState<ServiceProfile | null>(null);
	const [activeUser, setActiveUser] = useState<User | null>(null);
	const [selectedMovies, setSelectedMovies] = useState<(MovieDetails | MovieResult)[]>([]);
	const [selectedSeasons, setSelectedSeasons] = useState<CombinedSeason[]>([]);

	const { data: currentUser } = useSWR('currentUser', getCurrentUser);
	const { data: users } = useSWR('users', getUsers);

	// set the default arr server
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

	// set the default profile
	useEffect(() => {
		if (activeServer) {
			getArrServer(mediaType, activeServer.id).then((server) => {
				if (!server) {
					return;
				}

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

	// set the default user
	useEffect(() => {
		if (currentUser && users) {
			const user = users.results.find((user) => user.id === currentUser.id);
			if (!user) {
				setActiveUser(users.results[0]);
			} else {
				setActiveUser(user);
			}
		}
	}, [currentUser, users]);

	const movies = getMovies(mediaDetails);

	const seasons = getSeasons(mediaDetails);

	const handleRequest = async () => {
		if (!activeServer || !activeProfile || !activeUser) {
			return;
		}
		if (mediaType === MediaType.TV) {
			setRequesting(true);

			await postRequest(
				MediaType.TV,
				mediaDetails.id,
				activeServer.id,
				activeProfile.id,
				activeUser.id,
				selectedSeasons.map((season) => season.seasonDetails.id),
			);
		} else {
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
		<div className="flex h-fit w-full animate-fade flex-col justify-between gap-4 bg-system-primary-light px-4 pb-4 dark:bg-system-primary-dark">
			<div className="flex flex-col">
				<p
					className={`text-title-1-emphasized ${
						requesting ? 'text-system-orange-light' : 'text-system-indigo-light'
					} transition-colors duration-1000 ease-in`}
				>
					Request{' '}
					{mediaType === MediaType.MOVIE
						? 'Movie'
						: mediaType === MediaType.TV
							? 'Series'
							: 'Collection'}
				</p>
				<p className="text-large-title-emphasized">
					{'title' in mediaDetails ? mediaDetails.title : mediaDetails.name}
				</p>
			</div>

			{(mediaType === MediaType.MOVIE || mediaType === MediaType.COLLECTION) &&
				movies.length >= 1 && (
					<MovieSelector
						movies={movies}
						selectedMovies={selectedMovies}
						setSelectedMovies={setSelectedMovies}
					/>
				)}

			{mediaType === MediaType.TV && seasons.length >= 1 && (
				<SeasonSelector
					seasons={seasons}
					selectedSeasons={selectedSeasons}
					setSelectedSeasons={setSelectedSeasons}
				/>
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
									arrServers.find((server) => server.name === selectedServerName) || arrServers[0];
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

				<div className="flex w-full gap-4 pt-2">
					<Button
						className="w-full bg-system-secondary-light dark:bg-system-secondary-dark"
						onClick={() => {
							setRequesting(false);
							router.back();
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
							(selectedMovies.length === 0 && selectedSeasons.length === 0) ||
							!activeServer ||
							!activeProfile ||
							!activeUser
						}
					>
						<p className="text-subheadline-emphasized">Request</p>
					</Button>
				</div>
			</div>
		</div>
	);
}
