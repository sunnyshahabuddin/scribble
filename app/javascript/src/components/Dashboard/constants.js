import * as yup from "yup";

const camelize = value =>
  value
    .toLowerCase()
    .split(/[-_,./:\s]/)
    .reduce(
      (word, character) =>
        word + (character.charAt(0).toUpperCase() + character.slice(1))
    );

const buildSelectOptions = selectOptions =>
  selectOptions.map(selectOption => ({
    label: selectOption,
    value: camelize(selectOption),
  }));

export const FORM_INITIAL_VALUES = {
  title: "",
  category: null,
  body: "",
};

export const CATEGORIES = buildSelectOptions(["Getting Started", "Misc"]);

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  category: yup
    .object()
    .nullable()
    .shape({
      label: yup.string().oneOf(CATEGORIES.map(category => category.label)),
      value: yup.string().oneOf(CATEGORIES.map(category => category.value)),
    })
    .required("Category is required"),
});
