import Download from "@/components/Download";

type Download = {
  name: string;
  total_size_mb: number;
  eta: number;
  progress: number;
  state: string;
};

export default async function Downloads() {
  let downloads: Array<Download> = [];

  //get torrents from deluge
  try {
    const response = await fetch("http://192.168.1.93:8112/json", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "_session_id=ace72d949c326c71c29f30f232bf66d011c7f79392adcf8797dde63093dc8e534508",
      },
      body: JSON.stringify({
        id: "1",
        method: "core.get_torrents_status",
        params: [[], []],
      }),
    });
    const data = await response.json();
    for (let key in data.result) {
      const download = {
        name: data.result[key].name,
        total_size_mb: parseFloat(
          (data.result[key].total_size / 1048576).toFixed(1)
        ),
        eta: data.result[key].eta,
        progress: data.result[key].progress.toFixed(2),
        state: data.result[key].state,
      };
      downloads.push(download);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //get downloads from sabnzbd
  try {
    const response = await fetch(
      "http://192.168.1.93:8088/sabnzbd/api?output=json&apikey=2efde2f1e86e4abcb02ae46723d876b7&mode=queue",
      {
        method: "POST",
        cache: "no-store",
      }
    );
    const data = await response.json();

    for (let key in data.queue.slots) {
      const download = {
        name: data.queue.slots[key].filename,
        progress: parseFloat(data.queue.slots[key].percentage).toFixed(2),
        total_size_mb: data.queue.slots[key].mb,
        state: data.queue.slots[key].status,
        eta: data.queue.slots[key].timeleft,
      };
      downloads.push(download);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="flex h-full flex-col gap-2 bg-zinc-800/30 rounded-lg border-neutral-800 items-center w-full p-4 border overflow-auto">
      <div className="flex gap-2 w-full justify-between items-center">
        <p className="font-bold text-xl">Downloads</p>
        <p className="text-xs"></p>
      </div>
      {downloads.map((download) => (
        <Download
          key={download.name}
          name={download.name}
          total_size_mb={download.total_size_mb}
          eta={download.eta}
          progress={download.progress}
          state={download.state}
        />
      ))}
    </div>
  );
}
