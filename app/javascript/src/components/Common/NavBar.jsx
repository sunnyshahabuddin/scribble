import React from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button } from "neetoui";
import { NavLink } from "react-router-dom";

import { LANDING_PAGE_PATH, SETTING_PATH } from "components/routeConstants";

const NavBar = () => (
  <nav className="shadow flex h-16 border-b-2 bg-white px-6">
    <div className="flex w-full items-center justify-between">
      <div className="flex">
        <Typography style="h4">Scribble</Typography>
        <NavLink
          activeclassname="neeto-ui-text-primary-500 mx-6"
          className="neeto-ui-text-gray-500 mx-6"
          to={LANDING_PAGE_PATH}
        >
          <Typography style="h4">Articles</Typography>
        </NavLink>
        <NavLink
          activeclassname="neeto-ui-text-gray-500"
          className="neeto-ui-text-primary-500"
          to={SETTING_PATH}
        >
          <Typography style="h4">Settings</Typography>
        </NavLink>
      </div>
      <Button icon={ExternalLink} label="preview" style="secondary" />
    </div>
  </nav>
);

export default NavBar;
