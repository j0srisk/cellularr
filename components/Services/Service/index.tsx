'use client';

import { Service } from '@/app/types';
import Card from '@/components/Common/Card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ServiceCard({ service }: { service: Service }) {
	const router = useRouter();
	return (
		<Card
			key={service.name}
			className={`group flex flex-row items-center gap-4 rounded-lg p-3 ${
				service.href ? 'cursor-pointer' : ''
			}`}
			onClick={service.href ? () => router.push(service.href!) : undefined}
		>
			{service.icon.startsWith('http') ? (
				<img src={service.icon} alt={service.name} width={32} height={32} className="rounded-lg" />
			) : (
				<Image
					src={'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/' + service.icon}
					alt={service.name}
					width={32}
					height={32}
					className="rounded-lg"
					priority={true}
				/>
			)}
			<div className="flex flex-1 flex-col truncate">
				<p className="text-body-emphasized">{service.name}</p>
				<p className="hidden truncate text-footnote text-label-secondary-light dark:text-label-secondary-dark">
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
					className="h-6 w-6 stroke-label-secondary-light dark:stroke-label-secondary-dark"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			)}
		</Card>
	);
}
