import React from "react";

import { Info } from "neetoicons";
import { Button, Callout as NeetoUICallout, Typography } from "neetoui";

import { formatToDateAndTime } from "components/Dashboard/utils";

const Callout = ({ publishAt, unpublishAt }) => {
  const handleCancel = () => {
    //TODO: Add cancel functionality
  };

  return (
    <NeetoUICallout
      className="mb-4"
      icon={Info}
      style={!publishAt ? "success" : "warning"}
    >
      <div>
        <div className="flex">
          {publishAt && (
            <Typography style="body2">
              This article will be published at
            </Typography>
          )}
          {unpublishAt && (
            <Typography style="body2">
              This article will be unpublished at
            </Typography>
          )}
          <Typography className="mt-px" style="h5">
            &nbsp;"{formatToDateAndTime(!publishAt ? unpublishAt : publishAt)}".
          </Typography>
        </div>
        <div className="flex">
          <Button
            label="Click here"
            size="small"
            style="link"
            onClick={handleCancel}
          />
          <Typography style="body2">&nbsp;to cancel the schedule.</Typography>
        </div>
      </div>
      <br />
    </NeetoUICallout>
  );
};
export default Callout;
