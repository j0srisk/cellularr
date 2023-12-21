export default function InformationItem({
	title,
	value,
}: {
	title: string;
	value: string | JSX.Element;
}) {
	return (
		<div className="flex flex-col px-4">
			<p className="text-footnote">{title}</p>
			<p className="text-footnote text-label-secondary-light dark:text-label-secondary-dark">
				{value}
			</p>
		</div>
	);
}
