"use client";

import Heading from "@/components/Heading";
import { useState, useEffect, useRef } from "react";
import MediaCard from "@/components/MediaCard";
import MediaSkeleton from "@/components/MediaSkeleton";
import Backdrop from "@/components/Backdrop";
import { Result } from "@/app/types";
import { ConvertStatus } from "@/app/utils";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const [results, setResults] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query");

  const [search, setSearch] = useState<string | "">(searchQuery || "");

  //get search results from overseerr and add to results state
  async function fetchData(
    query: string,
    page: number = 1,
    language: string = "en"
  ) {
    const response = await fetch(
      "/api/overseerr/search?query=" +
        query +
        "&language=" +
        language +
        "&page=" +
        page
    );

    setIsLoading(true);
    const data = await response.json();
    setTotalPages(data.totalPages);
    const results = data.results;

    for (let key in results) {
      if (
        results[key].mediaType === "movie" ||
        results[key].mediaType === "tv"
      ) {
        const result: Result = {
          title:
            results[key].mediaType === "movie"
              ? results[key].title
              : results[key].name,
          year: results[key].releaseDate
            ? results[key].releaseDate.split("-")[0]
            : results[key].firstAirDate
            ? results[key].firstAirDate.split("-")[0]
            : null,
          id: results[key].id,
          posterUrl: results[key].posterPath
            ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${results[key].posterPath}`
            : null,
          backdropUrl: results[key].backdropPath
            ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${results[key].backdropPath}`
            : null,
          mediaType: results[key].mediaType,

          status: results[key].mediaInfo
            ? ConvertStatus(results[key].mediaInfo)
            : null,
        };

        setResults((results) => [...results, result]);
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setResults([]);
    if (searchQuery) {
      fetchData(searchQuery);
    }
    setSearch(searchQuery || "");
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full w-full px-4">
      <Heading heading="Search" subheading="Overseerr" />
      <div className="flex w-full bg-zinc-400/30 rounded-lg items-center px-4 gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 opacity-60"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            //setResults([]);
            //fetchData(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
          onBlur={() => {
            router.push("/search?query=" + search);
          }}
          className="bg-transparent text-white w-full p-2 outline-none placeholder-white/60"
        />
        {search && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8"
            onClick={() => {
              router.push("/search");
              setSearch("");
              setResults([]);
            }}
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        )}
      </div>
      <div
        ref={resultsContainerRef}
        className="flex flex-col gap-2 h-full w-full justify-start overflow-auto pb-2"
      >
        {isLoading ? (
          <div className="h-full w-full items-center justify-center flex flex-col gap-2">
            <p className="font-semibold">Loading...</p>
          </div>
        ) : (
          <>
            {results.length === 0 && search ? (
              <div className="h-full w-full items-center justify-center flex flex-col gap-2">
                <p className="font-semibold">No results found</p>
              </div>
            ) : (
              <>
                {results.map((result: Result) => (
                  <MediaCard key={result.id} result={result} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
