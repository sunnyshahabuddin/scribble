import React from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button } from "neetoui";

import { LANDING_PAGE_PATH, SETTING_PATH } from "components/routeConstants";

const NavBar = () => (
  <nav className="shadow flex h-16 border-b-2 bg-white px-6">
    <div className="flex w-full items-center justify-between">
      <div className="flex">
        <Typography style="h4">Scribble</Typography>
        <Button
          className="mx-6"
          label="Articles"
          style="link"
          to={LANDING_PAGE_PATH}
        />
        <Button label="Settings" style="link" to={SETTING_PATH} />
      </div>
      <Button icon={ExternalLink} label="preview" style="secondary" />
    </div>
  </nav>
);

export default NavBar;
