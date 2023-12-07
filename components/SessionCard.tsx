import { StateEnum } from "@/enums";
import Link from "next/link";
import Poster from "@/components/Poster";
import Backdrop from "@/components/Backdrop";

function formatDuration(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return `${hours > 0 ? `${hours}:` : ""}${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function SessionCard({
  thumb,
  parent_thumb,
  grandparent_thumb,
  art,
  title,
  grandparent_title,
  media_index,
  parent_media_index,
  year,
  user,
  state,
  progress_percent,
  transcode_progress,
  duration,
  rating_key,
}: {
  thumb: string;
  parent_thumb: string;
  grandparent_thumb: string;
  art: string;
  title: string;
  grandparent_title: string;
  media_index: number;
  parent_media_index: number;
  year: string;
  user: string;
  state: StateEnum;
  progress_percent: number;
  transcode_progress: number;
  duration: number;
  rating_key: string;
}) {
  let thumbUrl = "";

  //displays tv series thumb if available
  //TODO: proxy images through nextjs to not expose api key in client
  if (grandparent_thumb) {
    thumbUrl =
      "http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=pms_image_proxy&img=" +
      grandparent_thumb;
  } else {
    thumbUrl =
      "http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=pms_image_proxy&img=" +
      thumb;
  }

  const artUrl =
    "http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=pms_image_proxy&img=" +
    art;

  return (
    <Backdrop url={artUrl}>
      <div className="w-full flex gap-4">
        <Poster url={thumbUrl} alt={title} />

        <div className="flex flex-col justify-center items-start truncate">
          <p className="text-center text-white font-semibold truncate">
            {grandparent_title}
          </p>
          <p className="text-center font-semibold opacity-60 text-xs text-white truncate">
            {title}
          </p>

          {media_index ? (
            <p className="text-center text-xs font-semibold opacity-60 text-white">
              S{media_index} - E{parent_media_index}
            </p>
          ) : (
            <p className="text-center text-xs font-semibold opacity-60 text-white">
              {year}
            </p>
          )}
          <p className="text-center text-xs font-semibold opacity-60 text-white">
            {user}
          </p>
        </div>
      </div>
      <div className="w-full relative flex h-6 bg-neutral-800 rounded-md items-center px-1 justify-between overflow-hidden text-white ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="z-20 w-4"
        >
          {state === StateEnum.playing && (
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          )}
          {state === StateEnum.paused && (
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
              clipRule="evenodd"
            />
          )}
        </svg>

        <div className="flex gap-1 z-20 items-center text-white text-xs pr-1 font-semibold">
          <p className="">
            {formatDuration(duration * (progress_percent * 0.01))}
          </p>
          <p className="">/</p>
          <p className="">{formatDuration(duration)}</p>
        </div>

        <div
          style={{
            width: `${progress_percent}%`,
          }}
          className="absolute z-10 bg-amber-500 left-0 top-0 h-6"
        />
        <div
          style={{
            width: `${transcode_progress}%`,
          }}
          className="absolute bg-neutral-700 left-0 top-0 h-6"
        />
      </div>
    </Backdrop>
  );
}
