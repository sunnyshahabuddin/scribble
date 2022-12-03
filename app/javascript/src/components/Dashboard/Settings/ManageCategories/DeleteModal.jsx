import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Typography, Callout, Select } from "neetoui";

import categoriesApi from "apis/admin/categories";

const DeleteModal = ({
  category,
  showDeleteModal,
  setShowDeleteModal,
  refetch,
  categoryList,
}) => {
  const [moveArticlesToCategory, setMoveArticlesToCategory] = useState({});

  const handleSubmit = async id => {
    setShowDeleteModal(false);
    try {
      await categoriesApi.destroy({
        newCategoryId: moveArticlesToCategory.value,
        categoryId: id,
      });
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <Modal.Header>
        <Typography style="h2">Delete Category</Typography>
      </Modal.Header>
      {category.articles.length === 0 && (
        <Modal.Body className="space-y-2">
          <Typography className="mt-2" lineHeight="normal" style="body2">
            <strong>{category.name}</strong> has no articles. Are you sure you
            want to delete it? This action cannot be undone.
          </Typography>
        </Modal.Body>
      )}
      {category.articles.length > 0 && (
        <Modal.Body className="space-y-2">
          {category.name !== "General" && (
            <Typography className="mt-2" lineHeight="normal" style="body2">
              You are permanently deleting the {category.name} category. This
              action cannot be undone. Are you sure you wish to continue?
            </Typography>
          )}
          {categoryList.length > 1 && (
            <Callout icon={Warning} style="danger">
              <div>
                Category <strong>{category.name}</strong> has&nbsp;
                <strong>
                  {category.articles.length}
                  {category.articles.length > 1 ? " articles" : " article"}
                </strong>
                . Before this category can be deleted these articles needs to be
                moved to another category.
              </div>
            </Callout>
          )}
          {categoryList.length === 1 && category.name !== "General" && (
            <Callout icon={Warning} style="danger">
              <div>
                Category <strong>{category.name}</strong> has&nbsp;
                <strong>
                  {category.articles.length}
                  {category.articles.length > 1 ? " articles" : " article"}
                </strong>
                . This will be moved to category general. Click proceed to
                continue.
              </div>
            </Callout>
          )}
          {categoryList.length > 1 && (
            <Select
              required
              label="Select a category to move these articles into"
              name="category"
              placeholder="Select Category"
              strategy="fixed"
              options={categoryList
                .filter(categoryItem => categoryItem.id !== category.id)
                .map(category => ({
                  label: category.name,
                  value: category.id,
                }))}
              onChange={category => setMoveArticlesToCategory(category)}
            />
          )}
          {!moveArticlesToCategory.value && categoryList.length > 1 && (
            <Typography className="neeto-ui-text-error-500" style="body2">
              Please Select a Category
            </Typography>
          )}
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          label="Proceed"
          style="danger"
          disabled={
            moveArticlesToCategory.value === undefined &&
            categoryList.length > 1 &&
            category.articles.length > 0
          }
          onClick={() => {
            setShowDeleteModal(false);
            handleSubmit(category.id);
          }}
        />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowDeleteModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
