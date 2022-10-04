import Create from "components/Dashboard/Articles/Create";
import Edit from "components/Dashboard/Articles/Edit";
import LandingPage from "components/Dashboard/LandingPage";
import Settings from "components/Dashboard/Settings";

export const LANDING_PAGE_PATH = "/";
export const SETTING_PATH = "/settings";
export const ARTICLE_CREATE_PATH = "/articles/create";
export const ARTICLE_EDIT_PATH = "/articles/:slug/edit";
export const DASHBOARD_ROUTES = [
  {
    path: LANDING_PAGE_PATH,
    component: LandingPage,
  },
  {
    path: SETTING_PATH,
    component: Settings,
  },
  {
    path: ARTICLE_CREATE_PATH,
    component: Create,
  },
  {
    path: ARTICLE_EDIT_PATH,
    component: Edit,
  },
];
