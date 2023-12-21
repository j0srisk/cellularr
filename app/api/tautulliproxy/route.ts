import { NextRequest } from 'next/server';

const approvedCommands = [
	'get_metadata',
	'get_children_metadata',
	'get_activity',
	'pms_image_proxy',
	'get_server_identity',
];

export async function GET(request: NextRequest) {
	//get the searchParams from the request

	const queryParams = request.nextUrl.searchParams;

	if (
		!queryParams ||
		!queryParams.get('cmd') ||
		!approvedCommands.includes(queryParams.get('cmd').toString())
	) {
		// Return an error response if the command is not approved
		console.log('Command not allowed');
		return new Response(JSON.stringify({ error: 'Command not allowed' }), {
			headers: {
				'content-type': 'application/json',
			},
			status: 403,
		});
	}

	const queryString = queryParams.toString();

	//build the requestUrl
	const requestUrl =
		process.env.TAUTULLI_URL + '/api/v2?apikey=' + process.env.TAUTULLI_API_KEY + '&' + queryString;

	console.log(requestUrl);
	const response = await fetch(requestUrl, {
		cache: 'no-cache',
	});

	if (response.headers.get('content-type')?.startsWith('image/')) {
		// If the response is an image
		const imageBlob = await response.blob();
		return new Response(imageBlob, {
			headers: {
				'content-type': response.headers.get('content-type') || 'image/jpeg',
			},
		});
	} else {
		// If the response is JSON
		const data = await response.json();
		return new Response(JSON.stringify(data), {
			headers: {
				'content-type': 'application/json',
			},
		});
	}
}
