interface SectionTemplateProps {
	heading?: string | React.ReactNode;
	children: React.ReactNode;
}

export default function SectionTemplate({ heading, children }: SectionTemplateProps) {
	return (
		<div className="flex w-full flex-col gap-3">
			{heading && <p className="px-4 text-title-3-emphasized">{heading}</p>}
			{children}
		</div>
	);
}
