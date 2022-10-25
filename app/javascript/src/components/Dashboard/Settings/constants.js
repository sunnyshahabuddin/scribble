import { Repeat, Settings, Seo } from "neetoicons";
import * as yup from "yup";

export const MENUBAR_ITEMS = [
  {
    id: 1,
    heading: "General",
    body: "Page Title, Brand Name & Meta Description",
    tab: "general",
    icon: Settings,
  },
  {
    id: 2,
    heading: "Redirections",
    body: "Create & configure redirection rules",
    tab: "redirections",
    icon: Repeat,
  },
  {
    id: 3,
    heading: "Manage Categories",
    body: "Edit and Reorder KB Structure",
    tab: "managecategories",
    icon: Seo,
  },
];
export const FORM_INITIAL_VALUES = { name: "" };
export const FORM_VALIDATION_SCHEMA = () =>
  yup.object().shape({
    name: yup.string().required("Title is required"),
  });
