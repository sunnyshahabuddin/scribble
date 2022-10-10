import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";

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
      </Switch>
    </div>
  );
};

export default Settings;
