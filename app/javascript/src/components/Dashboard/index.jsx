import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "components/Common/NavBar";
import { DASHBOARD_ROUTES } from "components/routeConstants";

const Dashboard = () => (
  <Router>
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
    </Switch>
  </Router>
);

export default Dashboard;
