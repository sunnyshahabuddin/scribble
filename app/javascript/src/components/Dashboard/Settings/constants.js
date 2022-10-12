import { Repeat, Settings, Seo } from "neetoicons";
import * as yup from "yup";

export const MENUBAR_ITEMS = [
  {
    id: 1,
    heading: "General",
    body: "Page Title, Brand Name & Meta Description",
    path: "/general",
    icon: Settings,
  },
  {
    id: 2,
    heading: "Redirections",
    body: "Create & configure redirection rules",
    path: "/redirections",
    icon: Repeat,
  },
  {
    id: 3,
    heading: "Manage Categories",
    body: "Edit and Reorder KB Structure",
    path: "/managecategories",
    icon: Seo,
  },
];
export const ADD_CATEGORY_FORM_INITIAL_VALUES = { name: "" };
export const ADD_CATEGORY_FORM_VALIDATION_SCHEMA = () =>
  yup.object().shape({
    name: yup.string().required("Title is required"),
  });
export const DELETE_CATEGORY_FORM_INITIAL_VALUES = {
  title: "Sunny",
  category: null,
};
export const DELETE_CATEGORY_FORM_VALIDATION_SCHEMA = CATEGORY_LIST =>
  yup.object().shape({
    title: yup.string().required("Title is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(CATEGORY_LIST.map(category => category.name)),
        value: yup.string().oneOf(CATEGORY_LIST.map(category => category.id)),
      })
      .required("Category is required"),
  });
