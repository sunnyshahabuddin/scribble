import React, { useState } from "react";

import { Warning } from "neetoicons";
import { Modal, Button, Typography, Callout, Select, Toastr } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

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
      await articlesApi.batchUpdate({
        previous_category_id: id,
        updated_category_id: moveArticlesToCategory.value,
      });
      await categoriesApi.destroy(id);
      Toastr.success(
        `Articles successfully moved to the category: ${moveArticlesToCategory.label}`
      );
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
            Category <strong>{category.name}</strong> has&nbsp;
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
          onChange={e => setMoveArticlesToCategory(e)}
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
