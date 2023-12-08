export enum status {
  Unknown = "unknown",
  Pending = "pending",
  Processing = "processing",
  PartiallyAvailable = "partially available",
  Available = "available",
  Available4k = "available 4k",
}

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
};
