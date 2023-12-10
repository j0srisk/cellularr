"use client";
import SessionCard from "@/components/SessionCard";
import { StateEnum } from "@/enums";
import Heading from "@/components/Heading";
import useSWR from "swr";

const fetcher = (...args: any) =>
  fetch(...args, { method: "POST" }).then((res) => res.json());

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

export default function Page() {
  const {
    data: sessions,
    error,
    isLoading,
  } = useSWR("/api/sessions", fetcher, {
    refreshInterval: 5000,
  });

  let subheading = "";

  if (isLoading) {
    subheading = "Loading...";
  } else {
    subheading = `${sessions.length} active streams`;
    if (sessions.length === 1) {
      subheading = `${sessions.length} active stream`;
    }
  }

  return (
    <>
      <Heading heading="Now Playing" subheading={subheading} />
      <div className="flex flex-col gap-4 h-full w-full justify-between overflow-auto">
        {!isLoading && (
          <>
            {sessions.length === 0 && (
              <div className="flex flex-col flex-1 items-center justify-center">
                <p className=" text-neutral-500 text-center text-sm font-bold">
                  What is the sound <br></br> of nothing playing?
                </p>
              </div>
            )}
            {sessions.map((session: Session) => (
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
        )}
      </div>
    </>
  );
}
