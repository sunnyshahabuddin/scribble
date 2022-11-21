import * as yup from "yup";

export const REDIRECTION_HEADER = ["FROM PATH", "TO PATH", "ACTIONS"];

export const formValidationSchema = redirectionsList =>
  yup.object().shape({
    from: yup
      .string()
      .matches(/^\//, "From must be in the format of '/path'")
      .notOneOf(
        redirectionsList.map(redirection => redirection.from),
        "From already present"
      )
      .required("From Path is required"),
    to: yup
      .string()
      .matches(/^\//, "To must be in the format of '/path'")
      .notOneOf([yup.ref("from"), null], "To and From should not be equal")
      .required("To Path is required"),
  });
