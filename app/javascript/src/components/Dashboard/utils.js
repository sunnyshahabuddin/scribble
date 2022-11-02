import dayjs from "dayjs";

export const formatDateToDayMonthYear = date =>
  dayjs(date).format("D MMMM, YYYY");

export const formatDateToMonthDayYear = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");

export const formatToDateAndTime = dateTime =>
  dayjs(dateTime).format("h:mm A, DD/MM/YYYY");
