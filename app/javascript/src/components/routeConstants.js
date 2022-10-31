import LandingPage from "components/Dashboard/LandingPage";
import Analytics from "components/Dashboard/LandingPage/Analytics";
import Create from "components/Dashboard/LandingPage/Articles/Create";
import Edit from "components/Dashboard/LandingPage/Articles/Edit";

export const LANDING_PAGE_PATH = "/";
export const SETTING_PATH = "/settings/general";
export const ARTICLE_CREATE_PATH = "/articles/create";
export const ARTICLE_EDIT_PATH = "/articles/:id/edit";
export const ANALYTICS_PATH = "/analytics";
export const DASHBOARD_ROUTES = [
  {
    path: LANDING_PAGE_PATH,
    component: LandingPage,
  },
  {
    path: ARTICLE_CREATE_PATH,
    component: Create,
  },
  {
    path: ARTICLE_EDIT_PATH,
    component: Edit,
  },
  {
    path: ANALYTICS_PATH,
    component: Analytics,
  },
];
