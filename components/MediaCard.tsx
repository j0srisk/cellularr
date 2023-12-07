import Backdrop from "@/components/Backdrop";
import Poster from "@/components/Poster";

export default function MediaCard({
  title,
  posterUrl,
  backdropUrl,
}: {
  title: string;
  posterUrl: string;
  backdropUrl: string;
}) {
  return (
    <Backdrop url={backdropUrl}>
      <div className="w-full flex gap-4">
        <Poster url={posterUrl} alt={title} />

        <div className="flex flex-col justify-center items-start truncate">
          <p className="text-center font-semibold opacity-60 text-xs text-white truncate">
            {title}
          </p>
        </div>
      </div>
    </Backdrop>
  );
}
