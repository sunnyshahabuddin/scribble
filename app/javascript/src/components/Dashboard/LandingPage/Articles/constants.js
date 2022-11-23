import * as yup from "yup";

export const FORM_INITIAL_VALUES = {
  title: "",
  category: null,
  body: "",
  status: 0,
};
export const VALIDATION_SCHEMA = categoryList =>
  yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(
        /\w*[aA-zZ0-9]\w*/,
        "Title should have at least one alphabet or number and should start with it"
      )
      .max(255, "Title should not be more than 100 characters"),
    body: yup.string().required("Body is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.name)),
        value: yup.string().oneOf(categoryList.map(category => category.id)),
      })
      .required("Category is required"),
  });
export const ARTICLE_STATUS = [
  { id: 0, value: "Save Draft" },
  { id: 1, value: "Publish" },
  { id: 2, value: "Publish later" },
  { id: 3, value: "Unpublish later" },
];

export const findStatus = status => {
  if (status === "Save Draft") {
    return 0;
  } else if (status === "Publish") {
    return 1;
  } else if (status === "Publish later") {
    return 2;
  } else if (status === "Unpublish later") {
    return 3;
  }

  return 0;
};
