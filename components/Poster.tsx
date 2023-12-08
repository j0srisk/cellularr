export default function Poster({
  url,
  alt,
}: {
  url: string | null;
  alt: string;
}) {
  let posterUrl = "";

  if (!url) {
    posterUrl = "/overseerr_poster_not_found.png";
  } else {
    posterUrl = url;
  }

  return <img src={posterUrl} alt={alt} className="rounded-md shadow-md" />;
}
