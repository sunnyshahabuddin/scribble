import React, { useState } from "react";

import { Typography, Button } from "neetoui";

import Modal from "./RestoreModal";

const Version = ({ articleDetails, history }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Typography className="neeto-ui-text-gray-400 mr-4" style="h5">
        {history.date}
      </Typography>
      <Button
        label={history.status}
        style="link"
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
