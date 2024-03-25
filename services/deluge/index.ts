const deluge = (url: string, password: string) => ({
	url: url + '/json',
	password: password,
	session_id: null as string | null,
	auth: async function () {
		const headers = {
			'Content-Type': 'application/json',
			accept: 'application/json',
		};

		const body = JSON.stringify({
			jsonrpc: '2.0',
			id: 1,
			method: 'auth.login',
			params: [this.password],
		});

		const options: RequestInit = {
			headers: headers,
			method: 'POST',
			body: body,
			cache: 'no-cache',
		};

		const response = await fetch(this.url, options);

		if (response.headers.has('set-cookie')) {
			const session_id = response.headers.get('set-cookie')?.split(';')[0].split('=')[1];
			if (session_id) {
				this.session_id = session_id;
			}
		}
	},
	request: async function (method: string, params: any) {
		if (!this.session_id) {
			await this.auth();
		}

		const headers = {
			'Content-Type': 'application/json',
			accept: 'application/json',
			Cookie: `_session_id=${this.session_id}`,
		};

		const body = JSON.stringify({
			jsonrpc: '2.0',
			id: 1,
			method: method,
			params: params,
		});

		const options: RequestInit = {
			headers: headers,
			method: 'POST',
			body: body,
			cache: 'no-cache',
		};

		const response = await fetch(this.url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const json = await response.json();

		return json;
	},
});

export default deluge;
