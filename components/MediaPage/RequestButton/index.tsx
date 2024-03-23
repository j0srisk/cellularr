import Button from '@/components/Common/Button';
import { MediaStatus } from '@/services/overseerr/types/common';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function RequestButton({
	requestStatus,
	iOSPlexUrl,
}: {
	requestStatus?: MediaStatus;
	iOSPlexUrl?: string;
}) {
	const router = useRouter();
	const pathname = usePathname();
	if (requestStatus === MediaStatus.AVAILABLE) {
		return (
			<Button
				className="w-1/2 bg-system-orange-light text-label-primary-dark dark:bg-system-orange-dark dark:text-label-primary-dark"
				href={iOSPlexUrl}
			>
				<p className="text-subheadline-emphasized">{iOSPlexUrl ? 'Play on Plex' : 'Available'}</p>
				<svg
					className="hidden h-4 w-4 fill-current stroke-current"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M15.527 0h-9.287l10.239 16-10.239 16h9.287l10.233-16-10.233-16z" />
				</svg>
			</Button>
		);
	}

	//TODO: handle when collection/show is partially available but completely requested
	if (requestStatus === MediaStatus.PARTIALLY_AVAILABLE) {
		return (
			<>
				{iOSPlexUrl ? (
					<Button
						className="w-full bg-system-orange-light text-label-primary-dark dark:bg-system-orange-dark dark:text-label-primary-dark"
						href={iOSPlexUrl}
					>
						<p className="text-center text-subheadline-emphasized">Play on Plex</p>
						<svg
							className="hidden h-4 w-4 fill-current stroke-current"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M15.527 0h-9.287l10.239 16-10.239 16h9.287l10.233-16-10.233-16z" />
						</svg>
					</Button>
				) : (
					<Button className="w-full bg-system-orange-light text-label-primary-dark hover:cursor-auto dark:bg-system-orange-dark">
						<p className="text-center text-subheadline-emphasized">Partially Available</p>
						<svg
							className="hidden h-4 w-4 fill-current stroke-current"
							viewBox="0 0 32 32"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M15.527 0h-9.287l10.239 16-10.239 16h9.287l10.233-16-10.233-16z" />
						</svg>
					</Button>
				)}
				<Button
					className="w-full border border-system-indigo-dark bg-system-indigo-light text-label-primary-dark dark:border-system-indigo-dark dark:bg-system-indigo-light"
					onClick={() => router.push(`${pathname}/request`)}
				>
					<p className="text-center text-subheadline-emphasized">Request More</p>
				</Button>
			</>
		);
	}

	if (requestStatus === MediaStatus.PENDING) {
		return (
			<Button className="w-1/2 border border-system-indigo-dark bg-system-indigo-light text-label-primary-dark dark:border-system-indigo-dark dark:bg-system-indigo-light">
				<p className="text-subheadline-emphasized">Pending</p>
			</Button>
		);
	}

	if (requestStatus === MediaStatus.UNKNOWN) {
		return (
			<Button className="w-1/2 border border-system-indigo-dark bg-system-indigo-light text-label-primary-dark dark:border-system-indigo-dark dark:bg-system-indigo-light">
				<p className="text-subheadline-emphasized">Status Unknown</p>
			</Button>
		);
	}

	return (
		<Button
			className="w-1/2 border border-system-indigo-dark bg-system-indigo-light text-label-primary-dark dark:border-system-indigo-dark dark:bg-system-indigo-light"
			onClick={() => router.push(`${pathname}/request`)}
		>
			<p className="text-subheadline-emphasized">Request</p>
		</Button>
	);
}
