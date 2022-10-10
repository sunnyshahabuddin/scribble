import { Repeat, Settings, Seo } from "neetoicons";

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
