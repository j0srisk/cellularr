import Link from "next/link";

export default function Container({
  name,
  icon,
  url,
}: {
  name: string;
  icon: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      className="flex relative h-full gap-6 bg-zinc-800/30 rounded-lg border-neutral-800 justify-start items-center w-full p-4 border "
    >
      <img src={icon} alt="icon" className="h-20" />
      <p className="text-center text-white font-bold text-3xl">{name}</p>
      <div className="absolute hidden top-2 right-2 w-3 h-3 bg-green-500 rounded-full" />
      <div className="absolute z-20 top-2 right-2 p-1 px-2 bg-green-500 rounded-md">
        <p className="text-xs font-bold">Running</p>
      </div>
    </Link>
  );
}
