import React from "react";

import { Typography } from "neetoui";

import CurrentVersion from "./CurrentVersion";
import Version from "./Version";

const VersionHistory = ({ articleDetails, articleVersions }) => (
  <div className="border-l h-screen overflow-y-auto px-4">
    <div className="sticky top-0 z-40  bg-white">
      <Typography style="h2">Version History</Typography>
      <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
        Version history of {articleDetails.title} in Scribble.
      </Typography>
      <CurrentVersion articleDetails={articleDetails} />
    </div>
    {articleVersions.reverse().map(version => (
      <div className="mt-4 flex" key={version.id}>
        <Version version={version} />
      </div>
    ))}
  </div>
);

export default VersionHistory;
