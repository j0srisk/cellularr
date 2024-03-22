export default function Spinner({ className }: { className?: string }) {
	return (
		<svg
			stroke="currentColor"
			viewBox="-2 -2 42 42"
			xmlns="http://www.w3.org/2000/svg"
			className={`h-6 w-6 ${className}`}
		>
			<g transform="translate(1 1)" strokeWidth="6" fill="none">
				<circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
				<path d="M36 18c0-9.94-8.06-18-18-18">
					<animateTransform
						attributeName="transform"
						dur="1.5s"
						from="0 18 18"
						repeatCount="indefinite"
						to="360 18 18"
						type="rotate"
					></animateTransform>
				</path>
			</g>
		</svg>
	);
}
