import Image from "next/image";

import Tautulli from "@/components/Tautulli";
import App from "@/components/App";
import Array from "@/components/Array";
import Downloads from "@/components/Downloads";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 gap-4">
      <div className="flex flex-col gap-4 w-full lg:flex-row lg:gap-8">
        <Tautulli />
      </div>
    </main>
  );
}
