import { getServices } from '@/app/actions';
import NavigationBar from '@/components/Common/NavigationBar';
import Section from '@/components/Common/Section';
import ServiceCard from '@/components/Services/Service';

export default async function ApplicationPage() {
	const services = await getServices();

	let applicationsCount = 0;
	services.forEach((section) => {
		if (section.services) {
			applicationsCount += section.services.length;
		}
	});

	return (
		<div className="no-scrollbar flex h-full w-full flex-col overflow-auto">
			<NavigationBar
				title="Services"
				subtitle={applicationsCount + ' services found'}
				className=""
			/>
			<div className="pb-nav-4 flex h-fit w-full flex-col gap-4 pt-0">
				{services.map((section) => (
					<Section key={section.name} heading={section.name}>
						<div className="px-4">
							{section.services && (
								<div className="flex flex-col gap-4">
									{section.services.map((service) => (
										<ServiceCard key={service.name} service={service} />
									))}
								</div>
							)}
						</div>
					</Section>
				))}
			</div>
		</div>
	);
}
