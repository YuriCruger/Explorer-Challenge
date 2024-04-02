import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatDate(data: string) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dataInUserTimeZone = new Date(data + "Z").toLocaleString("en-US", {
    timeZone: userTimeZone,
  });

  const formattedDate = format(
    new Date(dataInUserTimeZone),
    "MM/dd/yy - HH:mm:ss",
    {
      locale: enUS,
    }
  );

  return formattedDate;
}
