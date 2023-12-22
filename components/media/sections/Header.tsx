import React from 'react';

type HeaderProps = {
	name: string;
	metadataDetailsArray?: (string | null)[];
	button?: JSX.Element;
	children: React.ReactNode;
};

export default function Header({ name, metadataDetailsArray, button, children }: HeaderProps) {
	return (
		<div className="flex h-fit w-full flex-col items-center justify-center px-4 pb-3">
			{/* Title */}
			<p className="text-center text-large-title-emphasized font-bold">{name}</p>
			{/* Media Info */}
			{metadataDetailsArray && (
				<div
					className="light:text-label-secondary-light
							 mb-[7px] flex w-full items-center justify-center gap-1 truncate text-footnote text-label-secondary-light dark:text-label-secondary-dark"
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
			<div className="flex w-full items-center gap-[9px] px-6">{children}</div>
		</div>
	);
}
