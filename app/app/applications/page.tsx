'use client';

import { GetApplications } from '@/app/actions';
import CenteredMessage from '@/components/CenteredMessage';
import Container from '@/components/Container';
import Header from '@/components/Header';
import Seperator from '@/components/ui/Seperator';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';

export default function ApplicationPage() {
	const [yamlData, setYamlData] = useState<any>(null);
	const [applicationCount, setApplicationCount] = useState<number>(0);

	useEffect(() => {
		async function fetchData() {
			const parsedYaml = await GetApplications();
			setYamlData(parsedYaml);
			setApplicationCount(
				parsedYaml.reduce((acc: number, curr: any) => acc + curr[Object.keys(curr)[0]].length, 0),
			);
		}
		fetchData();
	}, []);
	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header heading="Applications" subheading={applicationCount + ' applications found'} />
			<div className="pb-nav no-scrollbar flex h-full w-full flex-col justify-start gap-8 overflow-auto">
				{yamlData ? (
					<>
						{yamlData.map((section: any) => (
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
