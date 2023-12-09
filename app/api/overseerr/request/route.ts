export async function POST(request: Request) {
  const requestBody = await request.json();

  console.log("requestBody: ", requestBody);

  const mediaType = requestBody.mediaType;
  const mediaId = requestBody.mediaId;

  let overseerrUrl = "http://192.168.1.93:5055/api/v1/request";

  const response = await fetch(overseerrUrl, {
    headers: {
      "x-api-key":
        "MTYwODk2MjgyNjM3MDI3OWNjYWNmLWQ5MGEtNDQ5Ni1hYTExLTU2NGQ3ZDQxNmM5YSk=",
      "Content-Type": "application/json", // Set the Content-Type header
    },
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
    status: 200,
  });
}
