import MetadataDetails from '../MetadataDetails';
import { MovieDetails } from '@/app/types';
import RequestButton from '@/components/media/RequestButton';
import React from 'react';

type HeaderProps = {
	name: string;
	metadataDetailsArray?: string[] | null;
	button?: JSX.Element;
};

export default function Header({ name, metadataDetailsArray, button }: HeaderProps) {
	return (
		<div className="flex h-fit w-full flex-col items-center justify-center px-4 pb-3">
			{/* Title */}
			<p className="pb-1 text-center text-3xl font-bold text-white/95">{name}</p>
			{/* Media Info */}
			{metadataDetailsArray && (
				<div
					className="text-off-white
							 mb-3 flex w-full items-center justify-center gap-1 text-xs font-semibold"
				>
					{metadataDetailsArray.map((metadataDetail, index) => (
						<React.Fragment key={index}>
							<p>{metadataDetail}</p>
							{index !== metadataDetailsArray.length - 1 && <p>•</p>}
						</React.Fragment>
					))}
				</div>
			)}
			{/* metadataDetailsComponent */}
			{/* Play / Request Button */}
			<div className="flex w-full flex-col items-center px-6">{button}</div>
		</div>
	);
}
