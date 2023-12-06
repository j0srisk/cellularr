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
      <div className="flex flex-col gap-4 w-full lg:flex-row lg:gap-8">
        <Tautulli />
      </div>
    </main>
  );
}
