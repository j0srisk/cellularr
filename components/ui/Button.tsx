export default function Button({
	className,
	text,
	onClick,
	style,
	disabled,
}: {
	className?: string;
	text?: string;
	onClick?: () => void;
	style?: React.CSSProperties;
	disabled?: boolean;
}) {
	return (
		<button
			style={style}
			className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-subheadline-emphasized font-bold text-label-primary-dark ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
