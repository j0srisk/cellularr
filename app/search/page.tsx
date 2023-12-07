"use client";

import Heading from "@/components/Heading";
import { useState, useEffect } from "react";
import MediaCard from "@/components/MediaCard";

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
  const data = await response.json();
  const results = data.results;
  return results;
}

type Result = {
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  mediaType: string;
  id: number;
  year: string;
  available: boolean;
};

export default function Page() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    (async () => {
      if (query === "") return;

      const data = await fetchData(query);
      setResults([]);
      for (let key in data) {
        if (data[key].mediaType === "movie" || data[key].mediaType === "tv") {
          const result = {
            title:
              data[key].mediaType === "movie"
                ? data[key].title
                : data[key].name,
            overview: data[key].overview,
            posterUrl: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data[key].posterPath}`,
            backdropUrl: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data[key].backdropPath}`,
            mediaType: data[key].mediaType,
            id: data[key].id,
            year: data[key].releaseDate
              ? data[key].releaseDate.split("-")[0]
              : "",
            available: data[key].available,
          };
          console.log(result);
          setResults((results) => [...results, result]);
        }
      }
    })();
  }, [query]);

  return (
    <>
      <Heading heading="Search" subheading="Overseerr" />
      <div className="flex w-full bg-zinc-400/30 rounded-lg items-center px-4 gap-2">
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
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              (e.target as HTMLInputElement).blur();
            }
          }}
          //triggers search when input is blurred (enter key)
          onBlur={() => setQuery(search)}
          className="bg-transparent text-white w-full p-2 outline-none placeholder-white/60"
        />
      </div>
      <div className="flex flex-col gap-4 w-full justify-between overflow-auto">
        {results.length != 0 &&
          results.map((result: Result) => (
            <MediaCard key={result.id} title={result.title} />
          ))}
      </div>
    </>
  );
}
