import React, { useState } from "react";

import { Info } from "neetoicons";
import { Button, Callout as NeetoUICallout, Typography, Alert } from "neetoui";

import articlesApi from "apis/admin/articles";
import { formatToDateAndTime } from "components/Dashboard/utils";

const Callout = ({ articleDetails, refetch }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async id => {
    const payload = {
      publishAt: null,
      unpublishAt: null,
    };
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
        style={!articleDetails.publishAt ? "success" : "warning"}
      >
        <div>
          <div className="flex">
            {articleDetails.publishAt && (
              <Typography style="body2">
                This article will be published at
              </Typography>
            )}
            {articleDetails.unpublishAt && (
              <Typography style="body2">
                This article will be unpublished at
              </Typography>
            )}
            <Typography className="mt-px" style="h5">
              &nbsp;"
              {formatToDateAndTime(
                !articleDetails.publishAt
                  ? articleDetails.unpublishAt
                  : articleDetails.publishAt
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
            !articleDetails.publishAt
              ? "Cancel unpublish later Schedule"
              : "Cancel publish later Schedule"
          }
          onClose={() => setShowAlert(false)}
          onSubmit={() => handleSubmit(articleDetails.articleId)}
        />
      )}
    </>
  );
};
export default Callout;
