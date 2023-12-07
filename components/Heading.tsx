export default function Heading({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string | JSX.Element;
}) {
  return (
    <div className="flex flex-col w-full justify-between items-center pb-2">
      <p className="font-bold text-xl">{heading}</p>

      <p className="text-xs">{subheading}</p>
    </div>
  );
}
