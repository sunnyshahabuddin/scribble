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
        id: version.object.id,
        payload: {
          title: version.object.title,
          body: version.object.body,
          status: 0,
          categoryId: version.object.categoryId,
          restoredAt: version.object.updatedAt,
        },
      });
      if (
        articleDetails.schedule?.publishAt ||
        articleDetails.schedule?.unpublishAt
      ) {
        await scheduleApi.update({
          id: articleDetails.schedule.id,
          payload: {
            publishAt: null,
            unpublishAt: null,
          },
        });
      }
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
          Version history of {version.object.title} in Scribble.
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2 p-2">
        {(articleDetails.schedule?.publishAt ||
          articleDetails.schedule?.unpublishAt) && (
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
              {version.object.title}
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
          {version.object.body}
        </div>
        <div className="mt-6 flex pt-4">
          <TooltipWrapper
            disabled={!version.category || version.object.restoredAt}
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
              disabled={!version.category || version.object.restoredAt}
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
