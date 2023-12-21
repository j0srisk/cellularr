interface SectionTemplateProps {
	heading?: string | React.ReactNode;
	children: React.ReactNode;
}

export default function SectionTemplate({ heading, children }: SectionTemplateProps) {
	return (
		<div className="flex flex-col gap-3">
			{heading && <p className="text-title-3-emphasized px-4 text-white">{heading}</p>}
			{children}
		</div>
	);
}
