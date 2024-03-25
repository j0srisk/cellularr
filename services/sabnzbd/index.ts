import 'server-only';

const sabnzbd = (url: string, key: string) => ({
	url: url,
	key: key,
	mode: async function (mode: string) {
		if (!this.url || !this.key) {
			throw new Error('SabNZBD API: SabNZBD URL or API key not set');
		}

		const response = await fetch(
			this.url + '/api?output=json&apikey=' + this.key + '&mode=' + mode,
			{
				cache: 'no-cache',
			},
		);

		if (response.status !== 200) {
			const errorData = await response.json();
			throw new Error('SabNZBD API: ' + errorData.response.message);
		}

		return await response.json();
	},
});

export default sabnzbd;
