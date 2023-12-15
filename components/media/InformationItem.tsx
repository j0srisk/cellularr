export default function InformationItem({
	title,
	value,
}: {
	title: string;
	value: string | JSX.Element;
}) {
	return (
		<div className="flex flex-col px-4">
			<p className="text-xs font-medium text-white">{title}</p>
			<p className="text-off-white text-xs font-medium">{value}</p>
		</div>
	);
}
