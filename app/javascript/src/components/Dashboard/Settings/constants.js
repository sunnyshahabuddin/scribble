import { Repeat, Settings, Seo } from "neetoicons";

export const MENUBAR_ITEMS = [
  {
    id: 1,
    heading: "General",
    body: "Page Title, Brand Name & Meta Description",
    loc: "/general",
    icon: Settings,
  },
  {
    id: 2,
    heading: "Redirections",
    body: "Create & configure redirection rules",
    loc: "/redirections",
    icon: Repeat,
  },
  {
    id: 3,
    heading: "Manage Categories",
    body: "Edit and Reorder KB Structure",
    loc: "/managecategories",
    icon: Seo,
  },
];
