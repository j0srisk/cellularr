interface SectionTemplateProps {
	heading?: string | React.ReactNode;
	children: React.ReactNode;
}

export default function SectionTemplate({ heading, children }: SectionTemplateProps) {
	return (
		<div className="flex flex-col gap-3 pt-3">
			{heading && <p className="px-4 text-xl font-bold text-white">{heading}</p>}
			{children}
		</div>
	);
}