export async function GET(request: Request) {
	const response = await fetch(
		'http://192.168.1.93:8088/sabnzbd/api?output=json&apikey=2efde2f1e86e4abcb02ae46723d876b7&mode=queue',
		{
			method: 'POST',
			cache: 'no-store',
		},
	);

	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
