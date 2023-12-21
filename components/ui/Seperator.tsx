type SeperatorProps = {
	className?: string;
};

export default function Seperator({ className }: SeperatorProps) {
	return (
		<div className={`w-full ${className}`}>
			<div className="bg-separator-nonopaque-light dark:bg-separator-nonopaque-dark h-[.5px] w-full flex-shrink-0" />
		</div>
	);
}
