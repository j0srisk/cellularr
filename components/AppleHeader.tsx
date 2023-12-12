export default function AppleHeader({ heading, subheading }: { heading: any; subheading?: any }) {
	return (
		<div className="flex w-full flex-col pt-5">
			<p className="w-full truncate text-4xl font-black">{heading}</p>
			{subheading && (
				<p className="w-full truncate text-lg font-black text-neutral-400">{subheading}</p>
			)}
		</div>
	);
}
