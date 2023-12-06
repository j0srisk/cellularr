import Link from "next/link";

export default function App({
  icon,
  url,
  name,
}: {
  icon: string;
  url: string;
  name: string;
}) {
  return (
    <Link
      href={url}
      className="flex flex-1 flex-col gap-4 items-center bg-zinc-800/30 rounded-lg border-neutral-800 justify-center w-full p-4 border"
    >
      <img src={icon} alt="icon" className="h-24 rounded-full" />
      <p className="text-center text-white font-bold">{name}</p>
    </Link>
  );
}
