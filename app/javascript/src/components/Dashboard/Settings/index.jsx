import React from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import MenuBar from "./MenuBar";
import Redirections from "./Redirections";

const Settings = () => {
  const { path } = useRouteMatch();

  return (
    <div className="flex">
      <MenuBar />
      <Switch>
        <Route component={General} path={`${path}/general`} />
        <Route component={Redirections} path={`${path}/redirections`} />
        <Route component={ManageCategories} path={`${path}/managecategories`} />
        <Redirect from="/settings" to="/settings/general" />
      </Switch>
    </div>
  );
};

export default Settings;
