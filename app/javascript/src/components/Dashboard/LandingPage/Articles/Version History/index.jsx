import React from "react";

import { Typography } from "neetoui";

import Version from "./Version";

import { ARTICLE_HISTORY } from "../constants";

const VersionHistory = ({ articleDetails }) => (
  <div className="border-l h-screen w-1/3">
    <div className="mt-10 ml-4">
      <Typography style="h2">Version History</Typography>
      <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
        Version history of {articleDetails.title} in Scribble.
      </Typography>
    </div>
    {ARTICLE_HISTORY.map(history => (
      <div className="mt-4 ml-4 flex" key={history.id}>
        <Version articleDetails={articleDetails} history={history} />
      </div>
    ))}
  </div>
);

export default VersionHistory;