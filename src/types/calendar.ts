export type CalendarType = {
  dataType: string;
  id: string;
  eventDate: string;
  eventType: CalendarTypes;
  eventText: string;
  dates: string[];
  moretype?: CalendarTypes;
  isImportant?: boolean | null;
};

export type CalendarTypes = "events" | "meeting" | "info" | "deadline" | "parents" | null;

export type CalendarDay = {
  stringDate: string;
  date: number;
  isCurrentMonth: boolean;
  events: CalendarType[];
};
