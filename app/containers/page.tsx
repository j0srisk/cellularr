import CenteredMessage from '@/components/CenteredMessage';
import Container from '@/components/Container';
import Header from '@/components/Header';
import Seperator from '@/components/ui/Seperator';
import { promises as fs } from 'fs';
import { Fragment } from 'react';
import { parse } from 'yaml';

export default async function Page() {
	const yamlFile = await fs.readFile(process.cwd() + '/applications.yaml', 'utf8');

	const yamlData = parse(yamlFile);

	let applicationCount = 0;

	if (yamlData) {
		yamlData.forEach((section: any) => {
			applicationCount += section[Object.keys(section)[0]].length;
		});
	}

	return (
		<div className="pt-safe flex h-full w-full flex-col px-4">
			<Header
				heading="Applications"
				subheading={
					applicationCount + ' application' + (applicationCount === 1 ? '' : 's') + ' found'
				}
			/>
			<div className="pb-nav no-scrollbar flex h-full w-full flex-col justify-start gap-8 overflow-auto">
				{yamlData ? (
					<>
						{yamlData.map((section: any) => (
							<div className="flex flex-col gap-3">
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
					<CenteredMessage text="No Applications Found" />
				)}
			</div>
		</div>
	);
}
