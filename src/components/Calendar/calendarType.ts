export type CalendarType = {
  id: string;
  date: string;
  type: CalendarTypes;
  text: string;
  dates: string[];
  moretype?: CalendarTypes;
  important?: boolean;
};

export type CalendarTypes = "events" | "meeting" | "info" | "deadline" | "parents" | null;

export type CalendarDay = {
  stringDate: string;
  date: number;
  isCurrentMonth: boolean;
  events: CalendarType[];
};
