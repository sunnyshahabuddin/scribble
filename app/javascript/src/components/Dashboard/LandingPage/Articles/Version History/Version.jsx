import React, { useState } from "react";

import { Typography, Button } from "neetoui";

import { formatToDateAndTime } from "components/Dashboard/utils";

import Modal from "./RestoreModal";

const Version = ({ articleDetails }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Typography className="neeto-ui-text-gray-400 mr-4" style="h5">
        {formatToDateAndTime(articleDetails.date)}
      </Typography>
      <Button
        style="link"
        label={
          articleDetails.status === 1 ? "Article Published" : "Article Draft"
        }
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal
          articleDetails={articleDetails}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </>
  );
};

export default Version;
