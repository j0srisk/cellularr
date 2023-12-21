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
			<p className="text-large-title-emphasized text-label-primary-dark text-center font-bold">
				{name}
			</p>
			{/* Media Info */}
			{metadataDetailsArray && (
				<div
					className="text-footnote-emphasized
							 text-label-secondary-dark mb-[7px] flex w-full items-center justify-center gap-1 truncate"
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
