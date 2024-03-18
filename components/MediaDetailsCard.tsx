import { MediaDetail, Ratings } from '@/app/typess';
import Card from '@/components/Card';
import { RottenTomatoesCriticsRatingBadge } from '@/components/media/Badges';
import { Fragment } from 'react';

type MediaDetailsProps = {
	ratings?: Ratings;
	details: MediaDetail[];
};

export default function MediaDetailsCard({ ratings, details }: MediaDetailsProps) {
	return (
		<Card>
			{ratings && (
				<>
					<div className="flex items-center justify-center gap-6 p-3">
						{ratings?.rottenTomatoes && (
							<div className="flex items-center gap-2">
								<RottenTomatoesCriticsRatingBadge
									criticsRating={ratings.rottenTomatoes.criticsRating}
								/>
								<p className="text-subheadline">{ratings.rottenTomatoes.criticsScore}%</p>
							</div>
						)}
					</div>
					<div className="h-[1px] w-full bg-fill-tetiary-light" />
				</>
			)}

			{details.map((detail, index: number) => (
				<Fragment key={index}>
					<div className="flex w-full items-start justify-between p-2">
						<p className="text-subheadline-emphasized">{detail.key}</p>
						<div>
							{detail.values.map((value, index) => (
								<p
									key={index}
									className="w-full text-right text-subheadline text-label-secondary-light dark:text-label-secondary-dark"
								>
									{value}
								</p>
							))}
						</div>
					</div>
					{index < details.length - 1 && <div className="h-[1px] w-full bg-fill-tetiary-light" />}
				</Fragment>
			))}
		</Card>
	);
}
