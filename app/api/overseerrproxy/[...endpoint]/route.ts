import { NextRequest } from 'next/server';

const approvedEndpoints = ['status', 'movie', 'tv', 'search', 'request'];

export async function GET(
	request: NextRequest,
	{ params }: { params: { endpoint: Array<String> } },
) {
	//get the endpoint & searchParams from the request
	const endpoint = params.endpoint;

	const queryParams = request.nextUrl.searchParams;

	if (!approvedEndpoints.includes(endpoint[0].toString())) {
		// Return an error response if the endpoint is not approved
		return new Response(JSON.stringify({ error: 'Endpoint not allowed' }), {
			headers: {
				'content-type': 'application/json',
			},
			status: 403,
		});
	}

	//convert the endpoint array and searchParams to strings
	let endpointString = endpoint.join('/');

	const queryString = queryParams.toString();

	//build the requestUrl
	const requestUrl = process.env.OVERSEERR_URL + '/' + endpointString + '?' + queryString;

	console.log('requestUrl: ', requestUrl);
	const response = await fetch(requestUrl, {
		headers: {
			'x-api-key': process.env.OVERSEERR_API_KEY,
		},
		cache: 'no-cache',
	});
	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
