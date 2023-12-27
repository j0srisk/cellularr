import { NextRequest } from 'next/server';

const approvedEndpoints = ['status', 'movie', 'tv', 'collection', 'search', 'request'];

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

	let queryString = queryParams.toString();

	//overseerr uses %20 instead of + for spaces
	queryString = queryString.replaceAll('+', '%20');

	//build the requestUrl
	const requestUrl = process.env.OVERSEERR_URL + '/' + endpointString + '?' + queryString;

	const response = await fetch(requestUrl, {
		headers: {
			'x-api-key': process.env.OVERSEERR_API_KEY,
		} as HeadersInit,
		cache: 'no-cache',
	});

	if (!response.ok) {
		const errorData = await response.json();
		return new Response(JSON.stringify(errorData), {
			headers: {
				'content-type': 'application/json',
			},
			status: response.status,
			statusText: errorData.message,
		});
	}

	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
