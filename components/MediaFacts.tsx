import { MediaFact } from '@/app/types';
import Card from '@/components/Card';
import { RottenTomatoesCriticsRatingBadge } from '@/components/media/Badges';
import { Rating } from '@/services/overseerr/types/common';
import { Fragment } from 'react';

export default function MediaFacts({
	ratings,
	facts,
}: {
	ratings: { rottenTomatoes: Rating } | null;
	facts: MediaFact[];
}) {
	return (
		<Card>
			{ratings && Object.keys(ratings).length > 0 && (
				<>
					<div className="flex items-center justify-center gap-6 p-4 py-3">
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

			{facts.map((fact, index: number) => (
				<Fragment key={index}>
					<div className="flex w-full items-start justify-between p-4 py-2">
						<p className="text-subheadline-emphasized">{fact.key}</p>
						<div>
							{fact.values.map((value, index) => (
								<p
									key={index}
									className="w-full text-right text-subheadline text-label-secondary-light dark:text-label-secondary-dark"
								>
									{value}
								</p>
							))}
						</div>
					</div>
					{index < facts.length - 1 && <div className="h-[1px] w-full bg-fill-tetiary-light" />}
				</Fragment>
			))}
		</Card>
	);
}
