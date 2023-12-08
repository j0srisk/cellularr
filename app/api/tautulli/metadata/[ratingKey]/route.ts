export async function GET(
  request: Request,
  { params }: { params: { ratingKey: string } }
) {
  const ratingKey = params.ratingKey;

  const requestUrl =
    "http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=get_metadata&rating_key=" +
    ratingKey;

  const response = await fetch(requestUrl);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
