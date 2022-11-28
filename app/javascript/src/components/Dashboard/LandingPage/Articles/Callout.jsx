import React, { useState } from "react";

import { Info } from "neetoicons";
import { Button, Callout as NeetoUICallout, Typography, Alert } from "neetoui";

import articlesApi from "apis/admin/articles";
import { formatToDateAndTime } from "components/Dashboard/utils";

const Callout = ({ articleDetails, message, refetch }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async id => {
    const payload =
      message === "published" ? { publishAt: null } : { unpublishAt: null };
    try {
      await articlesApi.update({
        id,
        payload,
      });
      refetch();
      setShowAlert(false);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <NeetoUICallout
        className="mb-4"
        icon={Info}
        style={message === "unpublished" ? "success" : "warning"}
      >
        <div>
          <div className="flex">
            <Typography style="body2">
              This article will be {message} at
            </Typography>
            <Typography className="mt-px" style="h5">
              &nbsp;"
              {formatToDateAndTime(
                message === "published"
                  ? articleDetails.publishAt
                  : articleDetails.unpublishAt
              )}
              ".
            </Typography>
          </div>
          <div className="flex">
            <Button
              label="Click here"
              size="small"
              style="link"
              onClick={() => setShowAlert(true)}
            />
            <Typography style="body2">&nbsp;to cancel the schedule.</Typography>
          </div>
        </div>
      </NeetoUICallout>
      {showAlert && (
        <Alert
          isOpen={showAlert}
          message="Are you sure you want to cancel this schedule? This cannot be undone."
          title={
            message === "published"
              ? "Cancel publish later Schedule"
              : "Cancel unpublish later Schedule"
          }
          onClose={() => setShowAlert(false)}
          onSubmit={() => handleSubmit(articleDetails.articleId)}
        />
      )}
    </>
  );
};
export default Callout;
