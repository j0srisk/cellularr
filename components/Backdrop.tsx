export default function Backdrop({
	backdropUrl,
	backdropHeight,
	scaleFactor,
}: {
	backdropUrl: string;
	backdropHeight: number;
	scaleFactor: number;
}) {
	return (
		<span
			className="fixed top-0 -z-10 w-full bg-cover bg-center"
			style={{
				backgroundImage: `url(${backdropUrl}`,
				height: backdropHeight,
				transformOrigin: 'top',
				transform: `scale(${scaleFactor})`,
				transition: 'transform linear',
			}}
		/>
	);
}
