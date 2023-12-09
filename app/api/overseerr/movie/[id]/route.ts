import { Media } from "@/app/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const movieId = params.id;

  console.log("movieId: ", movieId);

  let overseerrUrl = "http://192.168.1.93:5055/api/v1/movie/" + movieId + "";

  const response = await fetch(overseerrUrl, {
    headers: {
      "x-api-key":
        "MTYwODk2MjgyNjM3MDI3OWNjYWNmLWQ5MGEtNDQ5Ni1hYTExLTU2NGQ3ZDQxNmM5YSk=",
    },
    cache: "no-cache",
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
