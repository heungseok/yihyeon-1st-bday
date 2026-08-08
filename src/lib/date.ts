const SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const toSeoulDayNumber = (date: Date) => {
  const seoulDate = new Date(date.getTime() + SEOUL_OFFSET_MS);
  return Math.floor(
    Date.UTC(
      seoulDate.getUTCFullYear(),
      seoulDate.getUTCMonth(),
      seoulDate.getUTCDate(),
    ) / DAY_MS,
  );
};

export const getDDay = (eventDate: string, now = new Date()) => {
  const [year, month, day] = eventDate.split("-").map(Number);
  const eventDayNumber = Math.floor(Date.UTC(year, month - 1, day) / DAY_MS);
  return eventDayNumber - toSeoulDayNumber(now);
};
