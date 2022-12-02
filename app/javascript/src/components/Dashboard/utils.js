import dayjs from "dayjs";
import { forEachObjIndexed } from "ramda";

const toCamelCase = key =>
  key.replace(/([-_][a-z])/gi, $1 =>
    $1.toUpperCase().replace("-", "").replace("_", "")
  );

const isArray = array => Array.isArray(array);

const isObject = object =>
  object === Object(object) && !isArray(object) && typeof object !== "function";

export const KeysToCamelCase = response => {
  if (isObject(response)) {
    const camelCaseResponse = {};

    forEachObjIndexed((value, key) => {
      camelCaseResponse[toCamelCase(key)] = KeysToCamelCase(value);
    }, response);

    return camelCaseResponse;
  } else if (isArray(response)) {
    return response.map(object => KeysToCamelCase(object));
  }

  return response;
};

export const formatDateToDayMonthYear = date =>
  dayjs(date).format("D MMMM, YYYY");

export const formatDateToMonthDayYear = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");

export const formatToDateAndTime = dateTime =>
  dayjs(dateTime).format("h:mm A, DD/MM/YYYY");
