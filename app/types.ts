export enum status {
  Unknown = "unknown",
  Pending = "pending",
  Processing = "processing",
  PartiallyAvailable = "partially available",
  Available = "available",
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
  tagline: string | null;
  runtime: number | null;
  iOSPlexUrl: string | null;
  plexUrl: string | null;
  resolution: string | null;
  codec: string | null;
  downloadProgress: number | null;
};

export type File = {
  size: number;
  resolution: string;
};
