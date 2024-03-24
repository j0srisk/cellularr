'use client';

import { getDelugeTorrents } from '@/app/actions';
import Card from '@/components/Common/Card';
import NavigationBar from '@/components/Common/NavigationBar';
import Section from '@/components/Common/Section';
import useSWR from 'swr';

export default function DownloadsPage() {
	const { data: torrentClients } = useSWR('getDelugeTorrents', getDelugeTorrents, {
		refreshInterval: 5000,
	});

	let torrentCount = 0;
	if (torrentClients) {
		torrentClients.forEach((client) => {
			torrentCount += client.torrents.length;
		});
	}

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<NavigationBar title="Downloads" subtitle={torrentCount + ' downloads found'} />
			<div className="pb-nav-4 flex h-fit w-full flex-col gap-4 overflow-x-hidden pt-0">
				{torrentClients && torrentClients.length > 0 && (
					<>
						{torrentClients.map((torrentClient) => (
							<Section
								heading={torrentClient.name}
								key={torrentClient.name}
								className="flex flex-col gap-4"
							>
								{torrentClient.torrents.map((torrent, index) => (
									<div className="flex w-full flex-col gap-4 px-4" key={torrent.id}>
										<Card key={torrent.id} className="flex w-full gap-4 p-3">
											<div className="flex w-full flex-col">
												<p className="w-full truncate text-start text-body-emphasized">
													{torrent.name}
												</p>
												<p className="truncate text-footnote text-label-secondary-light dark:text-label-secondary-dark">
													{torrent.size / 1024 / 1024 > 1024
														? (torrent.size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
														: (torrent.size / 1024 / 1024).toFixed(2) + ' MB'}
												</p>
											</div>
											<div className="flex w-full flex-col gap-2">
												<div className="flex w-full items-end justify-between">
													<p className="truncate text-title-2-emphasized text-system-blue-light dark:text-system-blue-dark">
														{torrent.progress.toFixed(2)}%
													</p>
													<p className="truncate text-body-emphasized text-label-secondary-light dark:text-label-secondary-dark">
														{torrent.state}
													</p>
												</div>
												<div className="relative h-1.5 w-full overflow-hidden rounded-sm bg-fill-tetiary-light dark:bg-fill-tetiary-dark">
													<div
														style={{ width: torrent.progress * 8 + '%' }}
														className="absolute h-full bg-system-blue-light dark:bg-system-blue-dark"
													></div>
												</div>
												<div className="flex w-full items-center justify-between gap-4">
													<div className="flex items-center gap-4">
														<div className="flex items-center gap-1">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={2}
																stroke="currentColor"
																className="h-5 w-5 stroke-label-secondary-light dark:stroke-label-secondary-dark"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
																/>
															</svg>
															<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
																{(torrent.downloadSpeed / 1024 / 1024).toFixed(2)} MB/s
															</p>
														</div>
														<div className="flex items-center gap-1">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={2}
																stroke="currentColor"
																className="h-5 w-5 stroke-label-secondary-light dark:stroke-label-secondary-dark"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
																/>
															</svg>

															<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
																{(torrent.uploadSpeed / 1024 / 1024).toFixed(2)} MB/s
															</p>
														</div>
													</div>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.75}
														stroke="currentColor"
														className="h-7 w-7 stroke-label-secondary-light dark:stroke-label-secondary-dark"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
														/>
													</svg>
												</div>
											</div>
										</Card>
									</div>
								))}
							</Section>
						))}
					</>
				)}
			</div>
		</div>
	);
}
