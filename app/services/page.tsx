import { getServices } from '@/app/actions';
import Card from '@/components/Common/Card';
import NavigationBar from '@/components/Common/NavigationBar';
import SafetyBar from '@/components/Common/SafetyBar';
import Image from 'next/image';

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
			<SafetyBar />
			<NavigationBar
				title="Services"
				subtitle={applicationsCount + ' services found'}
				className=""
			/>
			<div className="pb-nav-4 flex h-fit w-full flex-col gap-4 px-4 pt-2">
				{services.map((section) => (
					<Card key={section.name} className="gap-4 p-4 shadow-drop-sm">
						<p className="text-title-2-emphasized">{section.name}</p>

						{section.services && (
							<div className="flex flex-col gap-4">
								{section.services.map((service, index) => (
									<>
										<div className="flex items-center gap-3">
											<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-label-primary-light p-1 dark:bg-label-tetiary-dark">
												{service.icon.startsWith('http') ? (
													<img
														src={service.icon}
														alt={service.name}
														width={36}
														height={36}
														className="rounded-lg"
													/>
												) : (
													<Image
														src={
															'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/' +
															service.icon
														}
														alt={service.name}
														width={36}
														height={36}
														className="rounded-lg"
														priority={true}
													/>
												)}
											</div>
											<div className="flex flex-1 flex-col truncate">
												<p className="text-subheadline-emphasized">{service.name}</p>
												<p className="truncate text-footnote text-label-secondary-light dark:text-label-secondary-dark">
													{service.href}
												</p>
											</div>
											{service.href && (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-4 w-4 stroke-label-tetiary-light dark:stroke-label-tetiary-dark"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m8.25 4.5 7.5 7.5-7.5 7.5"
													/>
												</svg>
											)}
										</div>
									</>
								))}
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}
