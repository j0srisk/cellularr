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
      className="flex relative h-full gap-4 bg-zinc-500/30 rounded-xl justify-start items-center w-full p-4 "
    >
      <div className="h-14 w-14 rounded-xl  flex justify-center items-center">
        <img src={icon} alt="icon" className="" />
      </div>
      <p className="text-center text-white font-semibold text-2xl">{name}</p>
      <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full" />
      <div className="absolute hidden z-20 top-2 right-2 p-1 px-2 bg-green-500 rounded-md">
        <p className="text-xs font-bold">Running</p>
      </div>
    </Link>
  );
}
