import React from "react";

import { Typography, Button } from "neetoui";

import { ARTICLE_HISTORY } from "./constants";

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
        <Typography className="neeto-ui-text-gray-400 mr-4" style="h5">
          {history.date}
        </Typography>
        <Button label={history.status} style="link" />
      </div>
    ))}
  </div>
);

export default VersionHistory;
