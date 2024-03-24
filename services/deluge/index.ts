import { JSONRPCClient, JSONRPCErrorException } from 'json-rpc-2.0';
import 'server-only';

let _session_id = {};

export async function sendJsonRpcRequest(url: string, method: string, params: any) {
	const headers = {
		'content-type': 'application/json',
		accept: 'application/json',
	};

	const client: JSONRPCClient = new JSONRPCClient(async (rpcRequest) => {
		const body = JSON.stringify(rpcRequest);
		const httpRequestParams = {
			method: 'POST',
			headers,
			body,
		};

		const options: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				Cookie: _session_id.toString(),
			} as HeadersInit,
			method: 'POST',
			body: body,
			cache: 'no-cache',
		};

		const response = await fetch(url, options);

		if (response.headers.get('set-cookie')) {
			const session_id = response.headers.get('set-cookie')?.split(';')[0];
			if (session_id) {
				_session_id = session_id;
			}
		}

		const status = response.status;
		const data = await response.json();

		if (status === 200) {
			// in order to get access to the underlying error object in the JSON response
			// you must set `result` equal to undefined
			if (data.error && data.result === null) {
				data.result = undefined;
			}
			return client.receive(data);
		}

		return Promise.reject(data?.error ? data : new Error(data.toString()));
	});

	try {
		const response = await client.request(method, params);
		return {
			data: response,
			error: null,
		};
	} catch (e: any) {
		if (e instanceof JSONRPCErrorException) {
			return {
				data: null,
				error: e.toObject(),
			};
		}
		return {
			data: null,
			error: { code: 2, message: e.toString() },
		};
	}
}

const deluge = {
	sendJsonRpcRequest: sendJsonRpcRequest,
};

export default deluge;
