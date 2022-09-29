import React from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button } from "neetoui";

const NavBar = () => (
  <nav className="shadow flex h-16 bg-white px-6">
    <div className="flex w-full items-center justify-between">
      <div className="flex">
        <Typography style="h4">Scribble</Typography>
        <Typography className="mr-2 px-6 text-indigo-500" style="h4">
          Articles
        </Typography>
        <Typography className="neeto-ui-text-gray-400" style="h4">
          Settings
        </Typography>
      </div>
      <Button icon={ExternalLink} label="preview" style="secondary" />
    </div>
  </nav>
);

export default NavBar;
