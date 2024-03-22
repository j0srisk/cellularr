export default function Backdrop({
	backdropUrl,
	backdropHeight,
	scaleFactor,
	blurred = true,
}: {
	backdropUrl: string;
	backdropHeight: number;
	scaleFactor: number;
	blurred?: boolean;
}) {
	return (
		<span
			className={`fixed top-0 -z-10 w-full bg-cover bg-center ${blurred ? 'blur-sm ' : ''}`}
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
