import React from "react";

import { Button, Typography, Modal } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

const RestoreModal = ({ articleDetails, showModal, setShowModal }) => {
  const history = useHistory();

  const handleRestore = async () => {
    try {
      await articlesApi.update({
        id: articleDetails.id,
        payload: {
          title: articleDetails.title,
          body: articleDetails.body,
          status: 0,
          category_id: articleDetails.categoryId,
        },
      });
      history.go(0);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showModal} size="large" onClose={() => setShowModal(false)}>
      <Modal.Header>
        <Typography style="h2">Version history.</Typography>
        <Typography className="neeto-ui-text-gray-600 mt-1" style="body2">
          Version history of {articleDetails.title} in Scribble.
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2 p-2">
        <div className="mt-2 flex space-x-4">
          <div className="w-1/2">
            <Typography className="neeto-ui-text-gray-600" style="body2">
              Article Title
            </Typography>
            <div className="border h-8 overflow-y-auto p-1">
              {articleDetails.title}
            </div>
          </div>
          <div className="w-1/2">
            <Typography className="neeto-ui-text-gray-600" style="body2">
              Category
            </Typography>
            <div className="border h-8 overflow-y-auto p-1">
              {articleDetails.categoryName}
            </div>
          </div>
        </div>
        <Typography className="neeto-ui-text-gray-600" style="body2">
          Article Content
        </Typography>
        <div className="border h-48 overflow-y-auto p-1">
          {articleDetails.body}
        </div>
        <div className="mt-6 flex py-4">
          <Button
            className="h-8"
            label="Restore version"
            type="submit"
            onClick={() => {
              setShowModal(false);
              handleRestore();
            }}
          />
          <Button
            className="h-8"
            label="Cancel"
            style="text"
            type="reset"
            onClick={() => setShowModal(false)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RestoreModal;
