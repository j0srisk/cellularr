function formatDuration(seconds: number) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  return `${hours > 0 ? `${hours}:` : ""}${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function formatSize(size: number) {
  if (size < 1024) {
    return `${size} MB`;
  } else {
    const gbSize = size / 1024;
    return `${gbSize.toFixed(1)} GB`;
  }
}

export default function Download({
  name,
  total_size_mb,
  eta,
  progress,
  state,
}: {
  name: string;
  total_size_mb: number;
  eta: number;
  progress: number;
  state: string;
}) {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 items-center truncate">
        <p className="text-sm truncate">{name}</p>
      </div>
      <div className="w-16 relative flex h-6 items-center justify-center">
        <p className="text-white text-xs">{formatSize(total_size_mb)}</p>
      </div>
      <div className="w-24 relative flex h-6 items-center justify-center">
        {state === "Downloading" && <p className="text-white text-xs">{eta}</p>}
        {state === "Paused" && <p className="text-white text-xs">Paused</p>}
      </div>
      <div className="w-48 relative flex h-6 bg-neutral-800 justify-center rounded-md items-center overflow-hidden text-white ">
        <p className="text-white font-bold text-xs z-20">{progress}%</p>

        <div
          style={{
            width: `${progress}%`,
          }}
          className="absolute z-10 bg-blue-500 left-0 top-0 h-6"
        />
      </div>
    </div>
  );
}
