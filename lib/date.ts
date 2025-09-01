export default function EDate(date: string | Date) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // for 24-hour format
    timeZone: "Asia/Damascus",
  });
}
