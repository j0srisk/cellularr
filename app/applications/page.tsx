'use client';

import { GetApplications } from '@/app/actions';
import Container from '@/components/Applications/Container';
import Seperator from '@/components/Applications/Seperator';
import NavigationBar from '@/components/Common/NavigationBar';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';

export default function ApplicationPage() {
	const [applications, setApplications] = useState<any>(null);
	const [applicationCount, setApplicationCount] = useState<number>(0);

	useEffect(() => {
		//get sessions from session storage first
		if (typeof window !== 'undefined' && window.sessionStorage) {
			const sessionStorageApplications = JSON.parse(sessionStorage.getItem('applications') || '[]');
			const sessionStorageApplicationCount = sessionStorage.getItem('applicationCount');
			setApplications(sessionStorageApplications);
			setApplicationCount(parseInt(sessionStorageApplicationCount || '0'));
		}

		async function fetchData() {
			const applications = await GetApplications();
			setApplications(applications);
			sessionStorage.setItem('applications', JSON.stringify(applications));
			const applicationCount =
				applications?.reduce(
					(acc: number, curr: any) => acc + curr[Object.keys(curr)[0]].length,
					0,
				) || 0;
			setApplicationCount(applicationCount);
			sessionStorage.setItem('applicationCount', (applicationCount ?? 0).toString());
		}
		fetchData();
	}, []);
	return (
		<div className="pt-safe flex h-full w-full flex-col px-4 md:py-1">
			<NavigationBar title="Applications" subtitle={applicationCount + ' applications found'} />
			<div className="pb-nav no-scrollbar flex h-full w-full flex-col justify-start gap-8 overflow-auto">
				{applications ? (
					<>
						{applications.map((section: any) => (
							<div key={Object.keys(section)[0]} className="flex flex-col gap-3">
								<p className="text-title-3-emphasized">{Object.keys(section)[0]}</p>
								<div className="flex flex-col gap-[9px]">
									{section[Object.keys(section)[0]].map((container: any) => (
										<Fragment key={Object.keys(container)[0]}>
											<Container
												name={Object.keys(container)[0]}
												icon={container[Object.keys(container)[0]].icon}
												url={container[Object.keys(container)[0]].href}
												backgroundColor={container[Object.keys(container)[0]].background}
											/>
											{section[Object.keys(section)[0]].indexOf(container) !==
												section[Object.keys(section)[0]].length - 1 && <Seperator />}
										</Fragment>
									))}
								</div>
							</div>
						))}
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
