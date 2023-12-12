export async function GET(request: Request) {
	const response = await fetch(
		'http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=get_activity',
		{ cache: 'no-store' },
	);
	const data = await response.json();

	return new Response(JSON.stringify(data.response.data.sessions), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
