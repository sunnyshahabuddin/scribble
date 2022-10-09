import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "components/Common/NavBar";
import LandingPage from "components/Dashboard/LandingPage";

import Settings from "./Settings";

const Dashboard = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route exact component={LandingPage} path="/" />
      <Route component={Settings} path="/settings" />
    </Switch>
  </Router>
);

{
  /* <Router>
<NavBar />
<Switch>
  {DASHBOARD_ROUTES.map(({ path, component }) => (
    <Route exact component={component} key={path} path={path} />
  ))}
</Switch>
</Router> */
}
export default Dashboard;
