import React, { useState } from "react";

import { Typography, Button } from "neetoui";

import { formatToDateAndTime } from "components/Dashboard/utils";

import Modal from "./RestoreModal";

const Version = ({ version }) => {
  const [showModal, setShowModal] = useState(false);

  const articleStatus = version.article.status === 0 ? "Draft" : "Published";

  return (
    <>
      <Typography className="neeto-ui-text-gray-400 mr-4" style="h5">
        {formatToDateAndTime(version.article.updated_at)}
      </Typography>
      <Button
        style="link"
        label={`Article ${
          version.article.version_status ? "Restored" : articleStatus
        }`}
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          version={version}
        />
      )}
    </>
  );
};

export default Version;
