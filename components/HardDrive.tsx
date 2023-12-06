export default function HardDrive({
  device,
  utilization,
}: {
  device: string;
  utilization: number;
}) {
  return (
    <div className="w-full relative flex h-6 bg-neutral-800 rounded-md items-center px-1 overflow-hidden justify-between text-white ">
      <div className="flex gap-1 z-20 items-center justify-between w-full">
        <p className="text-white font-bold text-xs">{device}</p>
        <p className="text-white font-bold text-xs">{utilization}%</p>
      </div>

      <div
        style={{
          width: `${utilization}%`,
        }}
        className="absolute z-10 bg-green-500 left-0 top-0 h-6"
      />
    </div>
  );
}
