export async function GET(request: Request) {
	const url = new URL(request.url);
	const query = url.searchParams.get('query');
	const page = url.searchParams.get('page');
	const language = url.searchParams.get('language');

	console.log('query: ', query, 'page: ', page, 'language: ', language);

	let overseerrUrl = 'http://192.168.1.93:5055/api/v1/search?';
	if (query) {
		overseerrUrl += `query=${query}`;
	}
	if (page) {
		overseerrUrl += `&page=${page}`;
	}
	if (language) {
		overseerrUrl += `&language=${language}`;
	}
	const response = await fetch(overseerrUrl, {
		headers: {
			'x-api-key': 'MTYwODk2MjgyNjM3MDI3OWNjYWNmLWQ5MGEtNDQ5Ni1hYTExLTU2NGQ3ZDQxNmM5YSk=',
		},
	});
	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
