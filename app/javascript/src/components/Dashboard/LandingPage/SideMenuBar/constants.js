import * as yup from "yup";

export const FORM_INITIAL_VALUES = { name: "" };
export const VALIDATION_SCHEMA = () =>
  yup.object().shape({
    name: yup.string().required("Title is required"),
  });

export const ARTICLES_STATUS = [
  {
    label: "Draft",
    value: 0,
  },
  {
    label: "Published",
    value: 1,
  },
];
