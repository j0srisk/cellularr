import { getServices } from '@/app/actions';
import Card from '@/components/Common/Card';
import NavigationBar from '@/components/Common/NavigationBar';

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
				title="Applications"
				subtitle={applicationsCount + ' services found'}
				className=""
			/>
			<div className="pb-nav-4 grid h-fit w-full gap-4 px-4 pt-0 md:grid-cols-3">
				{services.map((section) => (
					<Card key={section.name} className="flex flex-col gap-2 p-2">
						<p className="text-lg font-bold">{section.name}</p>
						{section.services && (
							<>
								{section.services.map((service) => (
									<p key={service.name} className="text-sm">
										{service.name}
									</p>
								))}
							</>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}
