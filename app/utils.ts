import { status } from "@/app/types";

export function ConvertStatus(mediaInfo) {
  switch (mediaInfo.status) {
    case 1:
      return status.Unknown;
    case 2:
      return status.Pending;
    case 3:
      return status.Processing;
    case 4:
      return status.PartiallyAvailable;
    case 5:
      return status.Available;
  }

  return null;
}
