import LandingPage from "components/Dashboard/LandingPage";
import Settings from "components/Dashboard/Settings";

export const LANDING_PAGE_PATH = "/";
export const SETTING_PATH = "/settings";
export const DASHBOARD_ROUTES = [
  {
    path: LANDING_PAGE_PATH,
    component: LandingPage,
  },
  {
    path: SETTING_PATH,
    component: Settings,
  },
];
