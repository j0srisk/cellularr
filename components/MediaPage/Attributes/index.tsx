import { UnitedStatesCertification } from '@/app/types';
import { CertificationBadge } from '@/components/Badges';
import { Fragment } from 'react';

export default function MediaAttributes({ attributes }: { attributes: (string | null)[] }) {
	return (
		<div className="flex items-center justify-center gap-2 text-label-secondary-light dark:text-label-secondary-dark">
			{attributes.map((attribute, index) => (
				<Fragment key={index}>
					{attribute && (
						<>
							{attribute in UnitedStatesCertification ? (
								<div className="h-[15px] w-fit">
									<CertificationBadge certification={attribute} />
								</div>
							) : (
								<p className="text-subheadline">{attribute}</p>
							)}

							{index < attributes.length - 1 && <p className="text-subheadline-emphasized">•</p>}
						</>
					)}
				</Fragment>
			))}
		</div>
	);
}
