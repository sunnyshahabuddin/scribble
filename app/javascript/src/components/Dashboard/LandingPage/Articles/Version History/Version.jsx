import React, { useState } from "react";

import { Typography, Button } from "neetoui";

import { formatToDateAndTime } from "components/Dashboard/utils";

import RestoreModal from "./RestoreModal";

const Version = ({ version }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="border neeto-ui-rounded-md mr-4 w-full p-4">
        <div className="flex justify-between">
          <div>
            <Typography className="neeto-ui-text-gray-500 mr-4" style="body2">
              {formatToDateAndTime(version.object.updatedAt)}
            </Typography>
            {version.object.restoredAt && (
              <Typography className="neeto-ui-text-gray-500 mr-4" style="body2">
                Restored from ({formatToDateAndTime(version.object.restoredAt)})
              </Typography>
            )}
          </div>
          <Button
            style="link"
            label={
              version.object.status === 0
                ? "Article Drafted"
                : "Article Published"
            }
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>
      {showModal && (
        <RestoreModal
          setShowModal={setShowModal}
          showModal={showModal}
          version={version}
        />
      )}
    </>
  );
};

export default Version;
