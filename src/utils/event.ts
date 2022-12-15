import { Dayjs } from "dayjs";

const TIME_FORMAT = "HH:mm";
const DATE_FORMAT = "dddd, MMMM DD";

export function formatEventDateTime(start: Dayjs, end: Dayjs): string {
  if (start.isSame(end, "day")) {
    return `${start.format(DATE_FORMAT)} ${start.format(
      TIME_FORMAT
    )} - ${end.format(TIME_FORMAT)}`;
  }
  return `${start.format(DATE_FORMAT)} ${start.format(
    TIME_FORMAT
  )} - ${end.format(DATE_FORMAT)} ${end.format(TIME_FORMAT)}`;
}

export function formatEventTime(start: Dayjs, end: Dayjs): string {
  if (start.isSame(end, "day")) {
    return `${start.format(TIME_FORMAT)} - ${end.format(TIME_FORMAT)}`;
  }

  return start.format(TIME_FORMAT);
}
