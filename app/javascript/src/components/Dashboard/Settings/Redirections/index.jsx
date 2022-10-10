import React from "react";

import { Typography } from "neetoui";

import Table from "./Table";

const Redirections = () => (
  <div className="mx-auto mt-6 w-1/2">
    <Typography style="h2">Redirections</Typography>
    <Typography className="neeto-ui-text-gray-600" style="body1">
      Create and configure redirection rules to send users from old links to new
      links. All redirections are performed with 301 status codes to be SEO
      friendly.
    </Typography>
    <div className="neeto-ui-bg-primary-100 mt-2 p-6">
      <Table />
    </div>
  </div>
);

export default Redirections;
