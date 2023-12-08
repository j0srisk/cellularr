import Link from "next/link";
import Poster from "@/components/Poster";
import { status } from "@/app/types";
import { Media } from "@/app/types";
export default function MediaCard({ media }: { media: Media }) {
  return (
    <Link className="group" href={media.url}>
      <div className="w-full flex gap-4 items-center">
        <div className="h-20 aspect-[2/3]">
          <Poster url={media.posterUrl} alt={media.title} />
        </div>

        <div className="flex flex-col justify-center items-start w-full truncate">
          <p className="text-left text-white w-full font-semibold truncate text-lg">
            {media.title}
          </p>

          <div className="flex flex-row gap-2 items-center opacity-60">
            <p className="text-left w-full text-xs font-semibold text-white truncate">
              {media.year}
            </p>
            {status && (
              <p className="text-xs font-bold uppercase text-black bg-white p-.5 px-1 rounded-sm">
                {media.status}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
