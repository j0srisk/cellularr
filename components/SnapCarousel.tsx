export default function SnapCarousel({ children }: { children: React.ReactNode }) {
	return <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4">{children}</div>;
}
