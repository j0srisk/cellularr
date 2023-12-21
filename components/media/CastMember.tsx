import { Cast } from '@/app/types';
import { CreateProfileUrl } from '@/app/utils';
import Image from 'next/image';

export default function CastMember({ cast }: { cast: Cast }) {
	const imageUrl = CreateProfileUrl(cast.profilePath);

	return (
		<div className="flex w-24 flex-shrink-0 snap-start scroll-ml-4 flex-col items-center gap-2 ">
			<div className="h-24 w-24 overflow-hidden rounded-full">
				{imageUrl ? (
					<Image
						src={imageUrl}
						height={150}
						width={150}
						alt="icon"
						className="h-full w-full object-cover object-center"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-zinc-800 to-zinc-900 text-label-secondary-dark ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="h-8 w-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							/>
						</svg>
					</div>
				)}
			</div>

			<div className="flex w-full flex-col items-start justify-center">
				<p className="font-body w-full text-center text-subheadline">{cast.name}</p>
				<p className="w-full text-center text-footnote text-label-secondary-light dark:text-label-secondary-dark">
					{cast.character}
				</p>
			</div>
		</div>
	);
}
