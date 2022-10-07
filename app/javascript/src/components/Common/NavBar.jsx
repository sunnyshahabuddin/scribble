import React, { useState } from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Link } from "react-router-dom";

import { LANDING_PAGE_PATH, SETTING_PATH } from "components/routeConstants";

const NavBar = () => {
  const [articlesActiveStatus, setArticlesActiveStatus] = useState(true);

  return (
    <nav className="shadow flex h-16 border-b-2 bg-white px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex">
          <Typography style="h4">Scribble</Typography>
          <Link to={LANDING_PAGE_PATH}>
            <Typography
              style="h4"
              className={
                articlesActiveStatus
                  ? "neeto-ui-text-primary-500 mx-6"
                  : "neeto-ui-text-gray-500 mx-6"
              }
              onClick={() => setArticlesActiveStatus(true)}
            >
              Articles
            </Typography>
          </Link>
          <Link to={SETTING_PATH}>
            <Typography
              style="h4"
              className={
                articlesActiveStatus
                  ? "neeto-ui-text-gray-500"
                  : "neeto-ui-text-primary-500"
              }
              onClick={() => setArticlesActiveStatus(false)}
            >
              Settings
            </Typography>
          </Link>
        </div>
        <Button icon={ExternalLink} label="preview" style="secondary" />
      </div>
    </nav>
  );
};

export default NavBar;
