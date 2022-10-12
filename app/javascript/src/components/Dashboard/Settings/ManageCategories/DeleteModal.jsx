import React from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Typography, Callout, Select } from "neetoui";

import categoriesApi from "apis/categories";

const DeleteModal = ({
  category,
  showDeleteModal,
  setShowDeleteModal,
  refetch,
  categoryList,
}) => {
  const handleSubmit = async id => {
    setShowDeleteModal(false);
    try {
      await categoriesApi.destroy(id);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography className="mt-2" lineHeight="normal" style="body2">
          You are permanently deleting the {category.name} category. This action
          cannot be undone. Are you sure you wish to continue?
        </Typography>
        <Callout icon={Warning} style="danger">
          <div>
            Category <strong>{category.name}</strong> has
            <strong>
              {category.articles.length}
              {category.articles.length > 1 ? " articles" : " article"}
            </strong>
            . Before this category can be deleted these articles needs to be
            moved to another category.
          </div>
        </Callout>
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
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          label="Proceed"
          style="danger"
          type="submit"
          onClick={() => {
            setShowDeleteModal(false);
            handleSubmit(category.id);
          }}
        />
        <Button
          label="Cancel"
          style="text"
          type="cancel"
          onClick={() => setShowDeleteModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
