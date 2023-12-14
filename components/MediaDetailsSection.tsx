interface MediaDetailsSectionProps {
	heading?: string;
	children: React.ReactNode;
}

export default function MediaDetailsSection({ heading, children }: MediaDetailsSectionProps) {
	return (
		<div className="flex flex-col gap-3 py-3">
			{heading && <p className="px-4 text-xl font-bold text-white">{heading}</p>}
			{children}
		</div>
	);
}
