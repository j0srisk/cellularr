"use client";

import { Media } from "@/app/types";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";
export default function RequestButton({ media }: { media: Media }) {
  const router = useRouter();

  const handleRequest = async () => {
    console.log("requesting");
    const response = await fetch("/api/overseerr/request", {
      method: "POST",
      body: JSON.stringify({
        mediaType: media.mediaType,
        mediaId: media.id,
      }),
    });
    const data = await response.json();
    router.refresh();
  };

  return (
    <button
      className=" border border-indigo-500 bg-indigo-600 flex  py-2 justify-center w-full rounded-lg font-semibold h-fit items-center gap-2"
      onClick={handleRequest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
      </svg>
      <p className="capitalize">Request</p>
    </button>
  );
}
