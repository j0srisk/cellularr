export default function Button({
	className,
	text,
	onClick,
}: {
	className?: string;
	text?: string;
	onClick?: () => void;
}) {
	return (
		<button
			className={`text-bodytext-label-primary-dark flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-medium ${className}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
