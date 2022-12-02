import * as yup from "yup";

export const REDIRECTION_HEADER = [
  { id: 1, value: "FROM PATH" },
  { id: 2, value: "TO PATH" },
  { id: 3, value: "ACTIONS" },
];

export const VALIDATION_SCHEMA = yup.object().shape({
  from: yup
    .string()
    .notOneOf([yup.ref("to"), null], "To and From should not be equal")
    .matches(/^\//, "From must be in the format of '/path'")
    .required("From Path is required"),
  to: yup
    .string()
    .matches(/^\//, "To must be in the format of '/path'")
    .required("To Path is required"),
});
