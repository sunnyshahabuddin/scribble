import React, { useContext } from "react";

import { Typography } from "neetoui";

import ArticleDetailsContext from "contexts/articleContext";

import CurrentVersion from "./CurrentVersion";
import Version from "./Version";

const VersionHistory = ({ articleVersions }) => {
  const articleDetails = useContext(ArticleDetailsContext);

  return (
    <div className="border-l h-screen overflow-y-auto px-4">
      <div className="sticky top-0 z-40  bg-white">
        <Typography style="h2">Version History</Typography>
        <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
          Version history of {articleDetails.title} in Scribble.
        </Typography>
        <CurrentVersion />
      </div>
      {articleVersions.reverse().map(version => (
        <div className="mt-4 flex" key={version.id}>
          <Version version={version} />
        </div>
      ))}
    </div>
  );
};

export default VersionHistory;
