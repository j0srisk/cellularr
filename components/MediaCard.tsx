import Link from "next/link";
import Poster from "@/components/Poster";
import { status } from "@/app/types";
import { Result } from "@/app/types";
export default function MediaCard({ result }: { result: Result }) {
  const mediaUrl = "/" + result.mediaType + "/" + result.id;
  return (
    <Link className="group" href={mediaUrl}>
      <div className="w-full flex gap-4 items-center">
        <div className="h-20 aspect-[2/3]">
          <Poster url={result.posterUrl} alt={result.title} />
        </div>

        <div className="flex flex-col justify-center items-start w-full truncate">
          <p className="text-left text-white w-full font-semibold truncate text-lg">
            {result.title}
          </p>

          <div className="flex flex-row gap-2 items-center opacity-60">
            <p className="text-left w-full text-xs font-semibold text-white truncate">
              {result.year}
            </p>
            {result.status && (
              <p className="text-[.5rem] font-bold uppercase border border-white p-.5 px-1 rounded-sm">
                {result.status}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
