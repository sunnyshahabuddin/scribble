import Create from "components/Dashboard/Articles/Create";
import LandingPage from "components/Dashboard/LandingPage";
import Settings from "components/Dashboard/Settings";

export const LANDING_PAGE_PATH = "/";
export const SETTING_PATH = "/settings";
export const ARTICLE_CREATE_PATH = "/articles/create";
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
];
