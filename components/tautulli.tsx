import SessionCard from "@/components/SessionCard";
import { StateEnum } from "@/enums";

type Session = {
  session_id: string;
  thumb: string;
  parent_thumb: string;
  grandparent_thumb: string;
  art: string;
  title: string;
  media_index: number;
  parent_media_index: number;
  grandparent_title: string;
  year: string;
  user: string;
  state: StateEnum;
  progress_percent: number;
  transcode_progress: number;
  duration: number;
  rating_key: string;
};

export default async function Tautulli() {
  let sessions: Array<Session> = [];
  try {
    const response = await fetch(
      "http://192.168.1.93:8181/api/v2?apikey=f62d7595f52a47a99cd0216057b47016&cmd=get_activity",
      {
        cache: "no-store",
        next: { revalidate: 5 },
      }
    );
    const data = await response.json();
    sessions = data.response.data.sessions;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return (
    <div className="flex h-full flex-col gap-4 bg-zinc-800/30 rounded-lg border-neutral-800 items-center w-full p-4 border overflow-auto">
      <>
        <div className="flex gap-2 w-full justify-between items-center">
          <p className="font-bold text-xl">Streams</p>
          <p className="text-xs">27.1 TB used of 28 TB</p>
        </div>
        {sessions.map((session) => (
          <SessionCard
            key={session.session_id}
            thumb={session.thumb}
            parent_thumb={session.parent_thumb}
            grandparent_thumb={session.grandparent_thumb}
            art={session.art}
            title={session.title}
            grandparent_title={session.grandparent_title}
            media_index={session.media_index}
            parent_media_index={session.parent_media_index}
            year={session.year}
            user={session.user}
            state={session.state}
            progress_percent={session.progress_percent}
            transcode_progress={session.transcode_progress}
            duration={session.duration}
            rating_key={session.rating_key}
          />
        ))}
      </>
    </div>
  );
}
