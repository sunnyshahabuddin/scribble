import React, { useState } from "react";

import { DatePicker } from "antd";
import { Button, Typography, Modal } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import TooltipWrapper from "components/Common/TooltipWrapper";
import { LANDING_PAGE_PATH } from "components/routeConstants";

const ScheduleLater = ({ formValues, showSchedule, setShowSchedule }) => {
  const [dateTime, setDateTime] = useState("");

  const history = useHistory();

  const formatDateAndTime = (_, dateTime) => {
    setDateTime(dateTime.concat(":00 +0530"));
  };

  const handleSubmit = async formValues => {
    formValues.schedule_at = dateTime;
    formValues.status = 0;
    formValues.schedule_status = 1;
    try {
      await articlesApi.create(formValues);
      history.push(LANDING_PAGE_PATH);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal
      closeOnOutsideClick={false}
      isOpen={showSchedule}
      onClose={() => setShowSchedule(false)}
    >
      <Modal.Header>
        <Typography style="h2">
          Select date and time for publishing later
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <div className="flex justify-between">
          <DatePicker
            showTime
            className="w-full"
            format="YYYY-MM-DD HH:mm"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="Select date and time to schedule the article"
            onChange={formatDateAndTime}
          />
        </div>
      </Modal.Body>
      <div className="mt-8 mb-8 flex pt-4">
        <TooltipWrapper
          content="Select date and time to schedule the article"
          disabled={!dateTime}
          followCursor="horizontal"
          position="bottom"
        >
          <Button
            className="ml-4 h-8"
            disabled={!dateTime}
            label="Publish Later"
            type="submit"
            onClick={() => {
              handleSubmit(formValues);
              setShowSchedule(false);
            }}
          />
        </TooltipWrapper>
        <Button
          className="h-8"
          label="Cancel"
          style="text"
          type="reset"
          onClick={() => setShowSchedule(false)}
        />
      </div>
    </Modal>
  );
};
export default ScheduleLater;
