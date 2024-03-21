import 'server-only';

async function command(cmd: string) {
	if (!process.env.TAUTULLI_URL || !process.env.TAUTULLI_API_KEY) {
		throw new Error('Tautulli API: Tautulli URL or API key not set');
	}

	const response = await fetch(
		process.env.TAUTULLI_URL + '/api/v2?apikey=' + process.env.TAUTULLI_API_KEY + '&cmd=' + cmd,
		{ cache: 'no-cache' },
	);

	if (response.status !== 200) {
		const errorData = await response.json();
		throw new Error('Tautulli API: ' + errorData.response.message);
	}

	return (await response.json()).response.data;
}

const tautulli = {
	command: command,
};

export default tautulli;
