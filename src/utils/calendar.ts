import { Frequency, RRule } from "rrule";
import { Meeting } from "src/__generated__/graphql";
import { getDateTimeFromUTC } from "./dateTime";

function createRule(item: Meeting) {
  const { from, repeat } = item;

  const date = from.startOf("day").utc().toDate();
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

export function matches(item: Meeting, utcDate: Date) {
  const rule = createRule(item);

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

export function getEventsByDate(items: Meeting[], date: Date) {
  return items.filter((item) => matches(item, date)).sort(byTime);
}
