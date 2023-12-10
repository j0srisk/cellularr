import Link from "next/link";
import Poster from "@/components/Poster";
import { MediaStatus } from "@/app/types";
import { CreatePosterUrl } from "@/app/utils";
import { MovieDetails } from "@/app/types";
export default function MediaCard({
  movieDetails,
}: {
  movieDetails: MovieDetails;
}) {
  return (
    <Link
      className="group"
      href={"/" + movieDetails.mediaType + "/" + movieDetails.id}
    >
      <div className="w-full flex gap-4 items-center">
        <div className="h-20 aspect-[2/3]">
          <Poster
            url={CreatePosterUrl(movieDetails.posterPath)}
            alt={movieDetails.title}
          />
        </div>

        <div className="flex flex-col justify-center items-start w-full truncate">
          <p className="text-left text-white w-full font-semibold truncate text-lg">
            {movieDetails.title}
          </p>

          <div className="flex flex-row gap-2 items-center opacity-60">
            <p className="text-left w-full text-xs font-semibold text-white truncate">
              {movieDetails.releaseDate?.split("-")[0]}
            </p>
            {movieDetails.mediaInfo?.status && (
              <p className="text-[.5rem] font-bold uppercase border border-white p-.5 px-1 rounded-sm">
                {MediaStatus[movieDetails.mediaInfo.status]}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
