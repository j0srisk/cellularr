export default function Poster({ url, alt }: { url: string; alt: string }) {
  let posterUrl = "";

  if (!url) {
    posterUrl = "/overseerr_poster_not_found.png";
  } else {
    posterUrl = url;
  }

  return (
    <img src={posterUrl} alt={alt} className="h-20 rounded-md shadow-md" />
  );
}
