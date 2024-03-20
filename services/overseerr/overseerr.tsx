import 'server-only';

async function endpoint(endpoint: string, method: string = 'GET', body?: any) {
	if (!process.env.OVERSEERR_URL || !process.env.OVERSEERR_API_KEY) {
		throw new Error('Overseerr API: Overseerr URL or API key not set');
	}
	const options: RequestInit = {
		headers: {
			'x-api-key': process.env.OVERSEERR_API_KEY,
			'Content-Type': 'application/json',
		} as HeadersInit,
		cache: 'no-cache',
	};

	if (method !== 'GET' && method !== 'HEAD') {
		options.method = method;
		options.body = JSON.stringify(body);
	}

	const response = await fetch(process.env.OVERSEERR_URL + '/api/v1' + endpoint, options);

	if (response.status !== 200 && response.status !== 201) {
		const errorData = await response.json();
		if (errorData.error) {
			throw new Error('Overseerr API: ' + errorData.error);
		} else if (errorData.message) {
			//ignore errors for missing ratings
			if (
				errorData.message === 'Unable to retrieve movie ratings.' ||
				errorData.message === 'Unable to retrieve series ratings.' ||
				errorData.message === 'Rotten Tomatoes ratings not found.'
			) {
				return null;
			}
			console.error(errorData);
			throw new Error('Overseerr API: ' + errorData.message);
		} else {
			console.error(errorData);
			throw new Error('Overseerr API: Unknown error');
		}
	}

	return await response.json();
}

const overseerr = {
	endpoint: endpoint,
};

export default overseerr;
