import React, { useState } from "react";

import { Alert } from "neetoui";

import redirectionsApi from "apis/redirections";

const DeleteAlert = ({ refetch, onClose, redirectionItemId }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await redirectionsApi.destroy(redirectionItemId);
      refetch();
      onClose();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message="Are you sure you want to continue deleting this redirection? This cannot be undone."
      title="Delete Redirection"
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
