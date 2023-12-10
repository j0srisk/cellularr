export default function Backdrop({
  url,
  children,
}: {
  url?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={
        {
          "--image-url": `url(${url})`,
        } as React.CSSProperties
      }
      className="w-full h-fit rounded-2xl bg-cover bg-center bg-[image:var(--image-url)] bg-zinc-500/30 overflow-hidden shrink-0"
    >
      <div className="flex flex-col p-4 w-full h-full gap-4 backdrop-blur-xl bg-black bg-opacity-25">
        {children}
      </div>
    </div>
  );
}
