import * as yup from "yup";

const checkRedirectionCycle = (redirectionsList, fromValue, value) => {
  const toValues = redirectionsList.map(redirection => redirection.to);
  const fromValues = redirectionsList.map(redirection => redirection.from);
  const doesToExistsInFrom = fromValues.includes(value);
  const doesFromExistsInTo = toValues.includes(fromValue);

  return !doesToExistsInFrom || !doesFromExistsInTo;
};

export const REDIRECTION_HEADER = ["FROM PATH", "TO PATH", "ACTIONS"];

export const formValidationSchema = (redirectionsList, fromValue) =>
  yup.object().shape({
    from: yup
      .string()
      .matches(/^\//, "From must be in the format of '/path'")
      .notOneOf([yup.ref("to"), null], "To and From should not be equal")
      .required("From Path is required"),
    to: yup
      .string()
      .matches(/^\//, "To must be in the format of '/path'")
      .test(
        "checkForRedirectionLoop",
        "This will create a redirection loop",
        value => checkRedirectionCycle(redirectionsList, fromValue, value)
      )
      .required("To Path is required"),
  });
