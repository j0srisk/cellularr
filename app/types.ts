export enum status {
  Unknown = "unknown",
  Pending = "pending",
  Processing = "processing",
  PartiallyAvailable = "partially available",
  Available = "available",
  Available4k = "available 4k",
}

export type Result = {
  title: string;
  year: number;
  id: number;
  posterUrl: string | null;
  backdropUrl: string | null;
  mediaType: string;
  status: status | null;
};

export type Media = Result & {
  overview: string | null;
  runtime: number | null;
  iOSPlexUrl: string | null;
  plexUrl: string | null;
  resolution: string | null;
  codec: string | null;
};

{
  /*
export type Media = {
  title: string;
  year: number;
  id: number;
  posterUrl: string | null;
  backdropUrl: string | null;
  mediaType: string;
  overview: string;
  status: status | null;
  url: string;
  runtime: number | null;
  iOSPlexUrl: string | null;
  plexUrl: string | null;
};
*/
}
