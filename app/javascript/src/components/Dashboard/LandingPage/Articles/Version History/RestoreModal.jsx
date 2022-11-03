import React from "react";

import { Button, Typography, Modal } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import TooltipWrapper from "components/Common/TooltipWrapper";

const RestoreModal = ({ version, showModal, setShowModal }) => {
  const history = useHistory();

  const handleRestore = async () => {
    try {
      await articlesApi.update({
        id: version.article.id,
        payload: {
          title: version.article.title,
          body: version.article.body,
          status: 0,
          category_id: version.article.categoryId,
          version_status: true,
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
          Version history of {version.article.title} in Scribble.
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2 p-2">
        <div className="mt-2 flex space-x-4">
          <div className="w-1/2">
            <Typography className="neeto-ui-text-gray-600" style="body2">
              Article Title
            </Typography>
            <div className="border h-8 overflow-y-auto p-1">
              {version.article.title}
            </div>
          </div>
          <div className="w-1/2">
            <Typography className="neeto-ui-text-gray-600" style="body2">
              Category
            </Typography>
            <div className="border h-8 overflow-y-auto p-1">
              {version.category ? version.category : "Category was deleted"}
            </div>
          </div>
        </div>
        <Typography className="neeto-ui-text-gray-600" style="body2">
          Article Content
        </Typography>
        <div className="border h-48 overflow-y-auto p-1">
          {version.article.body}
        </div>
        <div className="mt-6 flex py-4">
          <TooltipWrapper
            content="Cannot restore, category was deleted"
            disabled={!version.category}
            followCursor="horizontal"
            position="bottom"
          >
            <Button
              className="h-8"
              disabled={!version.category}
              label="Restore version"
              type="submit"
              onClick={() => {
                setShowModal(false);
                handleRestore();
              }}
            />
          </TooltipWrapper>
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
