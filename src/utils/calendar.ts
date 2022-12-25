import { Frequency, RRule } from "rrule";
import { Meeting } from "src/__generated__/graphql";
import { getCurrentDateTime, getDateTimeFromUTC } from "./dateTime";

export function createRule(item: Meeting, withTime = false) {
  const { from, repeat } = item;

  const date = withTime
    ? from.utc().toDate()
    : from.startOf("day").utc().toDate();
  if (!repeat) {
    return new RRule({
      dtstart: date,
      until: date,
      freq: Frequency.DAILY,
    });
  }

  return new RRule({
    dtstart: date,
    freq: Frequency[repeat.freq],
    interval: repeat.interval,
  });
}

export function matches(item: Meeting, utcDate: Date, withTime = false) {
  const rule = createRule(item, withTime);

  const selectedDate = getDateTimeFromUTC(utcDate);
  const nextDate = rule.after(utcDate, true);

  return !!nextDate && selectedDate.isSame(nextDate, "day");
}

const byTime = (a: Meeting, b: Meeting) => {
  if (a.from === b.from) {
    return 0;
  }

  if (!a.from) {
    return -1;
  }

  if (!b.from) {
    return 1;
  }

  if (a.from > b.from) {
    return 1;
  }

  return -1;
};

export function getEventsByDate(
  items: Meeting[],
  date: Date,
  withTime = false
) {
  return items.filter((item) => matches(item, date, withTime)).sort(byTime);
}

export function getUpcomingEvent(items: Meeting[]) {
  const [event] = getEventsByDate(
    items,
    getCurrentDateTime().utc().toDate(),
    true
  );

  return event;
}
