import React from "react";

import { Switch, Route } from "react-router-dom";

import NavBar from "components/Dashboard/Common/NavBar";

import Settings from "./Settings";

import { DASHBOARD_ROUTES } from "../routeConstants";

const Dashboard = () => (
  <>
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
      <Route component={Settings} path="/settings" />
    </Switch>
  </>
);

export default Dashboard;
