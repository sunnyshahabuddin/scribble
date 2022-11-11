import React from "react";

import { Typography } from "neetoui";

import { formatToDateAndTime } from "components/Dashboard/utils";

const CurrentVersion = ({ articleDetails }) => (
  <div className="border neeto-ui-rounded-md neeto-ui-bg-primary-100 mr-4 mt-4 p-4">
    <div className="flex justify-between">
      <div>
        <Typography className="neeto-ui-text-gray-500" style="body2">
          {formatToDateAndTime(articleDetails.updatedAt)}
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
);

export default CurrentVersion;
