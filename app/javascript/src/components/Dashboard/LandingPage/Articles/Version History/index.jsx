import React from "react";

import { Typography } from "neetoui";

import { formatToDateAndTime } from "components/Dashboard/utils";

import Version from "./Version";

const VersionHistory = ({ articleDetails, articleVersions }) => (
  <div className="border-l h-screen overflow-y-auto px-4">
    <div className="sticky top-0 z-40  bg-white">
      <Typography style="h2">Version History</Typography>
      <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
        Version history of {articleDetails.title} in Scribble.
      </Typography>
      <div className="border neeto-ui-rounded-md neeto-ui-bg-primary-100 mr-4 mt-4 p-4">
        <div className="flex justify-between">
          <div>
            <Typography className="neeto-ui-text-gray-500" style="body2">
              {formatToDateAndTime(articleDetails.updated_at)}
            </Typography>
            <Typography className="neeto-ui-text-gray-500" style="body2">
              Current Version
            </Typography>
            {articleDetails.restoredAt && (
              <Typography className="neeto-ui-text-gray-500 mr-4" style="body2">
                Restored from ({formatToDateAndTime(articleDetails.restoredAt)})
              </Typography>
            )}
          </div>
          <Typography className="ml-4 mt-3" style="h4">
            {`Article ${articleDetails.status === 0 ? "Draft" : "Published"}`}
          </Typography>
        </div>
      </div>
    </div>
    {articleVersions.reverse().map(version => (
      <div className="mt-4 flex" key={version.id}>
        <Version version={version} />
      </div>
    ))}
  </div>
);

export default VersionHistory;
