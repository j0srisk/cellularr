"use client";

import Heading from "@/components/Heading";
import { useState, useEffect, useRef } from "react";
import MediaCard from "@/components/MediaCard";
import Backdrop from "@/components/Backdrop";
import { Media } from "@/app/types";
import { ConvertStatus } from "@/app/utils";

export default function Page() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  //get search results from overseerr and add to results state
  async function fetchData(page: number = 1, language: string = "en") {
    const response = await fetch(
      "/api/overseerr/search?query=" +
        query +
        "&language=" +
        language +
        "&page=" +
        page
    );

    const data = await response.json();
    setTotalPages(data.totalPages);
    const results = data.results;

    for (let key in results) {
      if (
        results[key].mediaType === "movie" ||
        results[key].mediaType === "tv"
      ) {
        const media: Media = {
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
          overview: results[key].overview,
          status: results[key].mediaInfo
            ? ConvertStatus(results[key].mediaInfo)
            : null,
          url:
            results[key].mediaType === "movie"
              ? "/movie/" + results[key].id
              : "/tv/" + results[key].id,
          runtime: results[key].runtime,
        };
        console.log(media.status);
        setResults((results) => [...results, media]);
      }
    }
  }

  useEffect(() => {
    console.log("query changed: " + query);
    setResults([]);
    console.log("results cleared");
    (async () => {
      if (query === "") {
        console.log("query is empty");
        return;
      }

      setTotalPages(0);
      const data = await fetchData(1);
    })();
  }, [query]);

  const handleScroll = async () => {
    const resultsContainer = resultsContainerRef.current;
    if (!resultsContainer) return;

    const scrollTop = resultsContainer.scrollTop;
    const scrollHeight = resultsContainer.scrollHeight;
    const clientHeight = resultsContainer.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      const nextPage = page + 1;

      if (nextPage > totalPages) return;
      const data = await fetchData(nextPage);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    const resultsContainer = resultsContainerRef.current;
    if (!resultsContainer) return;

    resultsContainer.addEventListener("scroll", handleScroll);
    return () => {
      resultsContainer.removeEventListener("scroll", handleScroll);
    };
  }, [query, page, totalPages]);

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
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              //(e.target as HTMLInputElement).blur();
            }
          }}
          //triggers search when input is blurred (enter key)
          //onBlur={() => setQuery(search)}
          className="bg-transparent text-white w-full p-2 outline-none placeholder-white/60"
        />
      </div>
      <div
        ref={resultsContainerRef}
        className="flex flex-col gap-2 h-full w-full justify-between overflow-auto pb-2"
      >
        {results.length != 0 &&
          results.map((media: Media) => (
            <MediaCard key={media.id} media={media} />
          ))}
      </div>
    </div>
  );
}
