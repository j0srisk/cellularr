import HardDrive from "@/components/HardDrive";

export default function Array() {
  return (
    <div className="flex h-full flex-col gap-2 bg-zinc-800/30 rounded-lg border-neutral-800 items-center w-full p-4 border overflow-auto">
      <div className="flex gap-2 w-full justify-between items-center">
        <p className="font-bold text-xl">Array</p>
        <p className="text-xs">27.1 TB used of 28 TB</p>
      </div>
      <HardDrive device="Disk 1" utilization={97} />
      <HardDrive device="Disk 2" utilization={98} />
      <HardDrive device="Disk 3" utilization={97} />
      <HardDrive device="Disk 4" utilization={96} />
      <HardDrive device="Disk 5" utilization={98} />
      <HardDrive device="Disk 6" utilization={97} />
      <HardDrive device="Disk 7" utilization={94} />
      <div className="flex gap-2 w-full justify-between items-center">
        <p className="font-bold text-xl">Cache</p>
        <p className="text-xs">110 GB of 240 GB</p>
      </div>
      <HardDrive device="Cache" utilization={46} />
    </div>
  );
}
