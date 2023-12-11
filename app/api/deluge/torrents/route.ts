export async function GET(request: Request) {
	const response = await fetch('http://192.168.1.93:8112/json', {
		method: 'POST',
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
			Cookie: '_session_id=ace72d949c326c71c29f30f232bf66d011c7f79392adcf8797dde63093dc8e534508',
		},
		body: JSON.stringify({
			id: '1',
			method: 'core.get_torrents_status',
			params: [[], []],
		}),
	});

	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
