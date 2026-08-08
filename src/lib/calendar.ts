import type { Invitation } from "@/config/invitation";

const pad = (value: number) => String(value).padStart(2, "0");

const toCalendarUtc = (date: Date) =>
  `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;

const escapeIcs = (value: string) =>
  value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export const getCalendarRange = (dateTime: string) => {
  const start = new Date(dateTime);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  return { start, end };
};

export const createGoogleCalendarUrl = (data: Invitation) => {
  const { start, end } = getCalendarRange(data.event.dateTime);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: data.share.title,
    dates: `${toCalendarUtc(start)}/${toCalendarUtc(end)}`,
    location: `${data.event.venue}, ${data.event.address}`,
    details: `${data.baby.name}의 첫 번째 생일에 함께해 주세요.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadIcs = (data: Invitation) => {
  const { start, end } = getCalendarRange(data.event.dateTime);
  const contents = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yihyeon First Birthday//KO",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:yihyeon-first-birthday-${data.event.date}@invitation`,
    `DTSTAMP:${toCalendarUtc(new Date())}`,
    `DTSTART:${toCalendarUtc(start)}`,
    `DTEND:${toCalendarUtc(end)}`,
    `SUMMARY:${escapeIcs(data.share.title)}`,
    `LOCATION:${escapeIcs(`${data.event.venue}, ${data.event.address}`)}`,
    `DESCRIPTION:${escapeIcs(`${data.baby.name}의 첫 번째 생일에 함께해 주세요.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([contents], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "yihyeon-first-birthday.ics";
  anchor.click();
  URL.revokeObjectURL(url);
};
