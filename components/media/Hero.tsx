import { FileMetadata, MediaType } from '@/app/types';
import BadgeRow from '@/components/media/BadgeRow';

type HeroProps = {
	title: string;
	metadataDetailsArray?: (string | null)[];
	children: React.ReactNode;
	overview: string;
	id: number;
	mediaType?: MediaType;
	contentRating?: string;
	tautulliMetadata?: FileMetadata;
};

export default function Hero({
	title,
	metadataDetailsArray,
	children,
	overview,
	id,
	mediaType,
	contentRating,
	tautulliMetadata,
}: HeroProps) {
	return (
		<div className="relative flex h-[75vh] w-full flex-shrink-0 flex-col items-center justify-end">
			<p className="z-20 px-4 text-center text-large-title-emphasized font-bold text-label-primary-dark">
				{title}
			</p>
			{metadataDetailsArray && (
				<div
					className="light:text-label-secondary-light z-20
							 mb-[7px] flex w-full items-center justify-center gap-1 truncate text-footnote text-label-secondary-dark"
				>
					{metadataDetailsArray.map((metadataDetail, index) => (
						<>
							<p>{metadataDetail}</p>
							{index !== metadataDetailsArray.length - 1 && <p>•</p>}
						</>
					))}
				</div>
			)}
			<div className="z-30 flex w-full items-center gap-[9px] px-4">{children}</div>
			{/* completely blured background div */}
			<div className="relative flex w-full flex-col items-center gap-[9px] py-3">
				<p className="z-20 line-clamp-3 px-4 text-subheadline text-label-primary-dark">
					{overview}
				</p>
				{contentRating || tautulliMetadata ? (
					<BadgeRow
						id={id}
						mediaType={mediaType}
						contentRating={contentRating}
						tautulliMetadata={tautulliMetadata}
					/>
				) : null}
				{/* blured background with 120px gradient fade at the top */}
				<div
					style={{
						WebkitMask:
							'linear-gradient(to top, rgba(0, 0, 0, 1) calc(100% - 200px), rgba(0, 0, 0, 0))',
					}}
					className="absolute bottom-0 h-[calc(100%+200px)] w-full bg-system-primary-dark/50 backdrop-blur-[25px]"
				></div>
			</div>
		</div>
	);
}
