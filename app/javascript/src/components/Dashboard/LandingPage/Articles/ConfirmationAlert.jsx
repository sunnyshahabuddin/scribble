import React from "react";

import { Alert } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import scheduleApi from "apis/admin/schedules";
import { LANDING_PAGE_PATH } from "components/routeConstants";

import { buildConfirmationMessage } from "./utils";

const ConfirmationAlert = ({
  articleDetails,
  formValues,
  setShowConfirmationAlert,
  showConfirmationAlert,
}) => {
  const history = useHistory();

  const handleSubmit = async article => {
    try {
      await articlesApi.update({
        id: articleDetails.id,
        payload: article,
      });
      if (article.status === 1 && articleDetails.schedule?.publishAt !== null) {
        await scheduleApi.update({
          id: articleDetails.schedule.id,
          payload: {
            publishAt: null,
          },
        });
      } else if (
        article.status === 0 &&
        articleDetails.schedule?.unpublishAt !== null
      ) {
        await scheduleApi.update({
          id: articleDetails.schedule.id,
          payload: {
            unpublishAt: null,
          },
        });
      }
      history.push(LANDING_PAGE_PATH);
    } catch (error) {
      logger.error(error);
    }
    setShowConfirmationAlert(false);
  };

  return (
    <Alert
      isOpen={showConfirmationAlert}
      message={buildConfirmationMessage(articleDetails, formValues)}
      title="Confirm Schedule Cancellation"
      onClose={() => setShowConfirmationAlert(false)}
      onSubmit={() => handleSubmit(formValues)}
    />
  );
};

export default ConfirmationAlert;
