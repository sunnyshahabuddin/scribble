import * as yup from "yup";

export const formValidationSchema = (checkedValue, changePassword) =>
  yup.object().shape({
    siteName: yup.string().required("Title is required"),
    isPasswordProtected: yup.boolean(),
    password:
      checkedValue && changePassword
        ? yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/,
              "Password must have one letter and one number"
            )
        : yup.string().notRequired(),
  });
