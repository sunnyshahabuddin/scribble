import React, { useState } from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Button, Typography, Modal } from "neetoui";
import { useHistory } from "react-router-dom";

import scheduleApi from "apis/admin/schedules";
import TooltipWrapper from "components/Common/TooltipWrapper";

const ScheduleLater = ({
  articleDetails,
  formValues,
  showSchedule,
  setShowSchedule,
}) => {
  const [dateTime, setDateTime] = useState("");

  const history = useHistory();

  const formatDateAndTime = (_, dateTime) => {
    setDateTime(dateTime.concat(":00 +0530"));
  };

  const handleSubmit = async formValues => {
    try {
      if (
        articleDetails.schedule?.publishAt !== null &&
        articleDetails.schedule?.unpublishAt !== null
      ) {
        await scheduleApi.create({
          articleId: articleDetails.id,
          publishAt: formValues.status === 2 ? dateTime : null,
          unpublishAt: formValues.status === 3 ? dateTime : null,
        });
      } else {
        await scheduleApi.update({
          id: articleDetails.schedule.id,
          payload: {
            publishAt:
              formValues.status === 2
                ? dateTime
                : articleDetails.schedule?.publishAt,
            unpublishAt:
              formValues.status === 3
                ? dateTime
                : articleDetails.schedule?.unpublishAt,
          },
        });
      }
      history.go(0);
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
          Select date and time for scheduling later
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <div className="flex justify-between">
          <DatePicker
            showTime
            className="w-full"
            format="YYYY-MM-DD HH:mm"
            placeholder="Select date and time to schedule the article"
            disabledDate={current =>
              current && current < dayjs().startOf("day")
            }
            onChange={formatDateAndTime}
          />
        </div>
      </Modal.Body>
      <div className="mt-8 mb-8 flex pt-4">
        <TooltipWrapper
          content="Select date and time to schedule the article for later"
          disabled={!dateTime}
          followCursor="horizontal"
          position="bottom"
        >
          <Button
            className="ml-4 h-8"
            disabled={!dateTime}
            type="submit"
            label={
              formValues.status === 2 ? "Publish later" : "Unpublish later"
            }
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
