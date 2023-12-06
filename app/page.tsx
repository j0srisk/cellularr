import Image from "next/image";

import Tautulli from "@/components/tautulli";
import App from "@/components/App";
import Array from "@/components/Array";
import Downloads from "@/components/Downloads";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center p-4 gap-4">
      <p className="hidden w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Get started by editing&nbsp;
        <code className="font-mono font-bold">app/page.tsx</code>
      </p>
      <div className="w-2/3 flex flex-col gap-2">
        <Downloads />
        <div className="w-full flex gap-2">
          <div className="w-1/2">
            <Array />
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col h-full gap-2">
        <Tautulli />
        <div className="flex gap-2">
          <App
            icon={
              "https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/plex.svg"
            }
            url={"https://app.plex.tv/desktop"}
            name={"Plex"}
          />
          <App
            icon={
              "https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/sonarr.svg"
            }
            url={"https://tautulli.walkxcode.dev"}
            name={"Sonarr"}
          />
          <App
            icon={
              "https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/radarr.svg"
            }
            url={"https://tautulli.walkxcode.dev"}
            name={"Radarr"}
          />

          <App
            icon={
              "https://raw.githubusercontent.com/walkxcode/dashboard-icons/1385e150f515795aa078bdbae2b8cdafb7567368/svg/overseerr.svg"
            }
            url={"https://tautulli.walkxcode.dev"}
            name={"Overseerr"}
          />
        </div>
      </div>
    </main>
  );
}
