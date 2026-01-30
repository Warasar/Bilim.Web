export type CalendarType = {
  id: string;
  eventDate: string;
  eventText: string;
  eventType: "online" | "deadline" | "async" | "event";
  description?: string;
  isImportant?: boolean;
  startWhen?: string;
  endWhen?: string;
  eventTime?: string;
};

export type CalendarTypes = "events" | "meeting" | "info" | "deadline" | "parents" | null;

export type CalendarDay = {
  stringDate: string;
  date: number;
  isCurrentMonth: boolean;
  events: CalendarType[];
};
