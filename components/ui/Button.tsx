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
			className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-subheadline-emphasized font-bold text-label-primary-dark ${className}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
