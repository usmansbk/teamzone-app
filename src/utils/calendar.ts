import { Dayjs } from "dayjs";
import { Frequency, RRule, RRuleSet } from "rrule";
import { Meeting } from "src/__generated__/graphql";
import { getDateTimeFromUTC } from "./dateTime";

export interface AgendaSectionT {
  title: Dayjs;
  data: Meeting[];
}

export interface AgendaOptions {
  selectedDate: Date;
  isPast?: boolean;
}

function createRule(item: Meeting) {
  const { from, repeat } = item;

  const date = from.utc().startOf("day").toDate();
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

function createDateRules(items: Meeting[]) {
  const rules = new RRuleSet();

  items.forEach((item) => {
    rules.rrule(createRule(item));
  });

  return rules;
}

function matches(item: Meeting, utcDate: Date) {
  const rule = createRule(item);

  const nextDate = rule.after(utcDate, true);

  return !!nextDate && getDateTimeFromUTC(utcDate).isSame(nextDate, "day");
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

function getEventsByDate(items: Meeting[], date: Date) {
  return items.filter((item) => matches(item, date)).sort(byTime);
}

export default function* calendarGenerator(
  items: Meeting[],
  options: AgendaOptions
): Generator<AgendaSectionT, AgendaSectionT | null, AgendaSectionT> {
  const { isPast, selectedDate } = options;

  const rules = createDateRules(items);

  let date = isPast
    ? rules.before(selectedDate, true)
    : rules.after(selectedDate, true);

  while (date) {
    const events = getEventsByDate(items, date);

    yield {
      data: events,
      title: getDateTimeFromUTC(date),
    };

    date = isPast ? rules.before(date) : rules.after(date);
  }

  return null;
}
