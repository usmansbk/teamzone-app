import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export function getLocalTime(timezone: string) {
  return dayjs().tz(timezone).format("HH:mm");
}

export function getLocalDate(timezone: string, format: string) {
  return dayjs().tz(timezone).format(format);
}

export default dayjs;
