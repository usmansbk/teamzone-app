export type AppTheme = "system" | "light" | "dark";

export interface AppPreferences {
  is24Hour: boolean;
}

type RepeatT = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
export interface RecurrenceRule {
  freq: RepeatT;
  interval: number;
}
