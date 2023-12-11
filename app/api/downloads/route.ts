import { Download } from '@/app/types';

export async function GET(request: Request) {
	let downloads: Download[] = [];
	const delugeResponse = await fetch('http://localhost:3000/api/deluge/torrents', {
		method: 'GET',
		cache: 'no-store',
	});

	const delugeData = await delugeResponse.json();

	const delugeTorrents = Object.values(delugeData.result);

	delugeTorrents.forEach((torrent: any) => {
		const download: Download = {
			id: torrent.hash,
			name: torrent.name,
			size: torrent.total_size,
			sizeLeft: torrent.total_done,
			status: torrent.state,
		};
		downloads.push(download);
	});

	const sabnzbdResponse = await fetch('http://localhost:3000/api/sabnzbd/queue', {
		method: 'GET',
		cache: 'no-store',
	});

	const sabnzbdData = await sabnzbdResponse.json();

	const sabnzbdQueue = sabnzbdData.queue.slots;

	sabnzbdQueue.forEach((slot: any) => {
		const download: Download = {
			id: slot.nzo_id,
			name: slot.filename,
			size: parseFloat(slot.mb),
			sizeLeft: parseFloat(slot.mbleft),
			status: slot.status,
		};
		downloads.push(download);
	});

	return new Response(JSON.stringify(downloads), {
		headers: {
			'content-type': 'application/json',
		},
		status: 200,
	});
}
