import React from "react";

import { DatePicker, TimePicker } from "antd";
import { Button, Typography, Modal } from "neetoui";

const Schedule = ({ showSchedule, setShowSchedule }) => {
  const format = "HH";

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
          <TimePicker className="w-1/2" format={format} showNow={false} />
          <DatePicker
            className="w-1/2"
            getPopupContainer={triggerNode => triggerNode.parentNode}
          />
        </div>
      </Modal.Body>
      <div className="mt-8 mb-8 flex pt-4">
        <Button
          className="ml-4 h-8"
          label="Publish Later"
          type="submit"
          onClick={() => {
            setShowSchedule(false);
          }}
        />
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
export default Schedule;
