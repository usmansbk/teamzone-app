import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(localizedFormat);
dayjs.extend(duration);

export function getLocalTime(timezone: string, format = "HH:mm") {
  return dayjs().tz(timezone).format(format);
}

export function getRawLocalTime(timezone: string) {
  return dayjs().tz(timezone);
}

export function getCurrentDateTime() {
  return dayjs();
}

export function getLocalDate(timezone: string, format = "dddd, D MMMM, YYYY") {
  return dayjs().tz(timezone).format(format);
}

export function formatUTCOffset(timezone: string) {
  return dayjs().tz(timezone).format("Z");
}

export default dayjs;
