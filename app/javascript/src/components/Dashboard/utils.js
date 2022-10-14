import dayjs from "dayjs";

export const formatDateToDayMonthYear = date =>
  dayjs(date).format("D MMMM, YYYY");
export const formatDateToMonthDayYear = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");
