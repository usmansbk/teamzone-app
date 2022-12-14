import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

export function getCurrentDateTime() {
  return dayjs().tz();
}

export function getLocalDateTime(date: Dayjs | string) {
  return dayjs.tz(date);
}

export function getTimezoneLocalDateTime(date: Dayjs, timezone: string) {
  return dayjs.tz(date, timezone);
}

export function getCurrentTimezoneDateTime(timezone: string) {
  return dayjs().tz(timezone).second(0).millisecond(0);
}

export function formatUTCOffset(timezone: string) {
  return dayjs().tz(timezone).format("Z");
}

export function getTimeDifferenceInMs(currentTz: string, targetTz: string) {
  const now = dayjs().second(0).millisecond(0);
  const current = now.tz(currentTz, true);
  const target = now.tz(targetTz, true);
  return current.diff(target);
}

export function formatDuration(ms: number) {
  return dayjs.duration(ms, "milliseconds").humanize();
}

export function getDuration(source: Dayjs, target: Dayjs) {
  return dayjs(source).diff(target, "milliseconds");
}

export function addDuration(source: Dayjs, ms: number) {
  return dayjs(source).add(ms, "milliseconds");
}

export function getTimezoneDateTimeFromUTC(utcDate: Dayjs, timezone: string) {
  return dayjs.utc(utcDate).tz(timezone).second(0).millisecond(0);
}

export function getDateTimeFromUTC(utcDate: Dayjs | Date) {
  return dayjs.utc(utcDate).tz();
}

export function getRoundUpCurrentDateTime(timezone: string, interval = 15) {
  const currentDate = getCurrentTimezoneDateTime(timezone);
  const roundUp = Math.ceil(currentDate.minute() / interval) * interval;

  return currentDate.add(Math.abs(roundUp - currentDate.minute()), "minutes");
}

export function setDefaultTimezone(timezone: string) {
  dayjs.tz.setDefault(timezone);
}

export function dateAsDay(date: Date, timezone: string) {
  return dayjs(date).tz(timezone, true);
}

export function DayjsAdapter(this: any, props: any) {
  Object.assign(this, new AdapterDayjs(props));

  const tzOrUtc = (date: { $u: any }) =>
    (date?.$u ? this.dayjs.utc : this.dayjs)(date);

  this.date = (value: null) => {
    if (value === null) {
      return null;
    }

    return tzOrUtc(value);
  };

  return this;
}

export function mergeDates(day1: Dayjs, day2: Dayjs) {
  return day1.hour(day2.hour()).minute(day2.minute());
}

export default dayjs;
