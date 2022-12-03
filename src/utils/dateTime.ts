import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(localizedFormat);

export function getLocalTime(timezone: string) {
  return dayjs().tz(timezone).format("LT");
}

export function getLocalDate(timezone: string, format: string) {
  return dayjs().tz(timezone).format(format);
}

export default dayjs;
