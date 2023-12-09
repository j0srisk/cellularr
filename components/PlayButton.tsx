import Link from "next/link";
import { Media } from "@/app/types";

export default function PlayButton({ media }: { media: Media }) {
  return (
    <Link
      href={media.iOSPlexUrl ? media.iOSPlexUrl : "https://app.plex.tv"}
      className="border border-amber-400 bg-amber-500 flex  py-2 justify-center w-full rounded-lg font-semibold h-fit items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
      </svg>
      Play on Plex
    </Link>
  );
}
