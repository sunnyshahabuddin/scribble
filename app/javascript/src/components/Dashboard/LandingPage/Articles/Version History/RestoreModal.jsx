import React, { useContext } from "react";

import { Info } from "neetoicons";
import { Button, Typography, Modal, Callout } from "neetoui";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import scheduleApi from "apis/admin/schedules";
import TooltipWrapper from "components/Common/TooltipWrapper";
import ArticleDetailsContext from "contexts/articleContext";

const RestoreModal = ({ version, showModal, setShowModal }) => {
  const history = useHistory();
  const articleDetails = useContext(ArticleDetailsContext);

  const handleRestore = async () => {
    try {
      await articlesApi.update({
        id: version.article.id,
        payload: {
          title: version.article.title,
          body: version.article.body,
          status: 0,
          categoryId: version.article.category_id,
          restoredAt: version.article.updated_at,
        },
      });
      await scheduleApi.update({
        id: articleDetails.schedule.id,
        payload: {
          publishAt: null,
          unpublishAt: null,
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
        {(articleDetails.schedule.publishAt ||
          articleDetails.schedule.unpublishAt) && (
          <Callout icon={Info} style="danger">
            Note: Restoring a version will cancel the current schedule.
          </Callout>
        )}
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
        <div className="mt-6 flex pt-4">
          <TooltipWrapper
            disabled={!version.category || version.article.restored_at}
            followCursor="horizontal"
            position="bottom"
            content={
              !version.category
                ? "Cannot restore, category was deleted"
                : "Already restored, check restored from"
            }
          >
            <Button
              className="h-8"
              disabled={!version.category || version.article.restored_at}
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
        <Typography className="mb-2" style="body3">
          Note: After restoration the article will be draft by default.
        </Typography>
      </Modal.Body>
    </Modal>
  );
};

export default RestoreModal;
