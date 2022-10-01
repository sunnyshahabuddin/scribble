import dayjs from "dayjs";

export const formatDateToMonthDayYear = date =>
  dayjs(date).format("MMMM D YYYY");
