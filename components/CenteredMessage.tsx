export default function CenteredMessage({
	text,
	children,
}: {
	text?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className="fixed left-0 top-0 -z-10 flex h-screen w-screen items-center justify-center">
			{text && <p className="text-label-secondary-dark text-body-emphasized z-20">{text}</p>}
			{children}
		</div>
	);
}
