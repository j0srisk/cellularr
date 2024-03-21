export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="no-scrollbar pb-nav pt-safe w-full overflow-auto">
			<div className="p-4">{children}</div>
		</div>
	);
}
