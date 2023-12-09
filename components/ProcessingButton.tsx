"use client";

import { Media } from "@/app/types";
import { useState } from "react";
import useSWR from "swr";
import { ConvertStatus } from "@/app/utils";
import { useRouter } from "next/navigation";

export default function ProcessingButton({ media }: { media: Media }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(null);

  const Router = useRouter();

  const fetcher = (...args) =>
    fetch(...args, { method: "GET", cache: "no-store" }).then((res) =>
      res.json()
    );

  const { error } = useSWR(
    "/api/overseerr/" + media.mediaType + "/" + media.id,
    fetcher,
    {
      refreshInterval: 5000,
      onSuccess: (data) => {
        console.log(data);
        //movie has begun downloading
        if (data.mediaInfo.downloadStatus[0]) {
          //movie is still downloading
          if (data.mediaInfo.downloadStatus[0].status === "downloading") {
            setIsDownloading(true);
            console.log("downloading");
            const progress = (
              ((data.mediaInfo.downloadStatus[0].size -
                data.mediaInfo.downloadStatus[0].sizeLeft) /
                data.mediaInfo.downloadStatus[0].size) *
              100
            ).toFixed(2);
            setDownloadProgress(progress);
            console.log(progress);
            //movie has completed downloading but is still processing
          } else if (data.mediaInfo.downloadStatus[0].status === "completed") {
            setIsDownloading(false);
            console.log("completed");
          }
          //movie is available
        } else if (ConvertStatus(data.mediaInfo) === "available") {
          console.log("available");
          Router.refresh();
        } else {
          setIsDownloading(false);
          console.log("not downloading");
        }
      },
    }
  );

  if (isDownloading) {
    return (
      <div className="relative border overflow-hidden border-indigo-500 bg-indigo-500 flex  py-2 justify-center w-full rounded-lg font-semibold h-fit items-center gap-2">
        <svg
          stroke="currentColor"
          viewBox="-2 -2 42 42"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 z-20"
        >
          <g transform="translate(1 1)" strokeWidth="6" fill="none">
            <circle cx="18" cy="18" r="18" strokeOpacity="0.5"></circle>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                from="0 18 18"
                repeatCount="indefinite"
                to="360 18 18"
                type="rotate"
              ></animateTransform>
            </path>
          </g>
        </svg>
        <p className="z-20">Downloading</p>

        <div
          style={{ width: `${downloadProgress}%` }}
          className="absolute left-0 bg-indigo-600 h-full"
        />
      </div>
    );
  }

  if (!isDownloading) {
    return (
      <div className="relative border overflow-hidden border-indigo-500 bg-indigo-600 flex  py-2 justify-center w-full rounded-lg font-semibold h-fit items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 z-20"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>

        <p className="z-20">Requested</p>
      </div>
    );
  }
}
