export default function Heading({ heading, subheading }: { heading: any; subheading: any }) {
	return (
		<div className="flex w-full justify-center px-4">
			<div className="max-w-screen flex flex-col truncate pb-2">
				<p className="truncate text-center text-xl font-bold">{heading}</p>

				<p className="text-center text-xs font-semibold opacity-60">{subheading}</p>
			</div>
		</div>
	);
}
