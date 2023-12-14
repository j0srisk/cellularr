import { Cast } from '@/app/types';
import { CreateProfileUrl } from '@/app/utils';

export default function CastMember({ cast }: { cast: Cast }) {
	return (
		<div className="flex w-24 flex-shrink-0 snap-start scroll-ml-4 flex-col items-center gap-2 ">
			<img
				src={CreateProfileUrl(cast.profilePath)}
				alt="icon"
				className="h-24 w-24 flex-grow-0 rounded-full object-cover object-center"
			/>
			<div className="w-full">
				<p className="text-center text-sm font-medium text-white">{cast.name}</p>
				<p className="text-off-white w-full truncate text-center text-xs font-medium">
					{cast.character}
				</p>
			</div>
		</div>
	);
}
