export default function Heading({
  heading,
  subheading,
}: {
  heading: any;
  subheading: any;
}) {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex flex-col max-w-screen pb-2 truncate">
        <p className="font-bold text-xl text-center truncate">{heading}</p>

        <p className="text-xs text-center font-semibold opacity-60">
          {subheading}
        </p>
      </div>
    </div>
  );
}
