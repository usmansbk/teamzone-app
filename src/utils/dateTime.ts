import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(localizedFormat);
dayjs.extend(duration);

export function getLocalTime(timezone: string, format = "HH:mm:ss") {
  return dayjs().tz(timezone).format(format);
}

export function getLocalDate(timezone: string, format = "dddd, D MMMM, YYYY") {
  return dayjs().tz(timezone).format(format);
}

export function formatUTCOffset(offset: number) {
  const utcOffset = dayjs.duration(offset, "minutes").format("HH:mm");

  return offset > 0 ? `+${utcOffset}` : utcOffset;
}

export default dayjs;
