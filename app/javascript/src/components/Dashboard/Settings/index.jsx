import React from "react";

import { Route, Switch, useRouteMatch, Link } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirections from "./Redirections";

const Settings = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className="flex">
      <div className="flex h-screen w-1/4 flex-col bg-red-900">
        <Link to={`${url}/general`}>General Settings</Link>
        <Link to={`${url}/redirections`}>Redirections</Link>
        <Link to={`${url}/managecategories`}>Manage Categories</Link>
      </div>
      <Switch>
        <Route component={General} path={`${path}/general`} />
        <Route component={Redirections} path={`${path}/redirections`} />
        <Route component={ManageCategories} path={`${path}/managecategories`} />
      </Switch>
    </div>
  );
};

export default Settings;
