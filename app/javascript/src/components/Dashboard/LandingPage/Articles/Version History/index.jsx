import React from "react";

import { Typography } from "neetoui";

import Version from "./Version";

const VersionHistory = ({ articleDetails, articleVersions }) => (
  <div className="border-l h-screen w-1/3">
    <div className="mt-10 ml-4">
      <Typography style="h2">Version History</Typography>
      <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
        Version history of {articleDetails.title} in Scribble.
      </Typography>
    </div>
    {articleVersions.length === 0 ? (
      <div className="mt-4 ml-4 flex">
        Make changes to the article to see the version history.
      </div>
    ) : (
      articleVersions.map(version => (
        <div className="mt-4 ml-4 flex" key={version.id}>
          <Version version={version} />
        </div>
      ))
    )}
  </div>
);

export default VersionHistory;
