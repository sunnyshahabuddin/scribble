import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Warning } from "neetoicons";
import { Modal, Button, Typography, Callout, PageLoader } from "neetoui";
import { Select } from "neetoui/formik";

import categoriesApi from "apis/categories";

import {
  DELETE_CATEGORY_FORM_INITIAL_VALUES,
  DELETE_CATEGORY_FORM_VALIDATION_SCHEMA,
} from "../constants";

const DeleteModal = () => {
  const [showModal, setShowModal] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const CATEGORY_LIST = [
    {
      label: "Value One",
      value: "value1",
    },
    {
      label: "Value Two",
      value: "value2",
    },
    {
      label: "Value Three",
      value: "value3",
    },
  ];
  const fetchCategoriesDetails = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setPageLoading(false);
      setCategoryList(categories);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoriesDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography lineHeight="normal" style="body2">
          You are permanently deleting the new category 2 category. This action
          cannot be undone. Are you sure you wish to continue?
        </Typography>
        <Callout icon={Warning} style="danger">
          Category "new" has "60" articles. Before this category can be deleted
          these articles needs to be moved to another category.
        </Callout>
        {/* TODO: add submitted upon adding handle submit function */}
        <Formik
          initialValues={DELETE_CATEGORY_FORM_INITIAL_VALUES}
          //validateOnBlur={submitted}
          //validateOnChange={submitted}
          validationSchema={DELETE_CATEGORY_FORM_VALIDATION_SCHEMA(
            CATEGORY_LIST
          )}
          //onSubmit={handleSubmit}
        >
          <FormikForm>
            <Select
              required
              label="Select a category to move these articles into"
              name="category"
              placeholder="Select Category"
              strategy="fixed"
              options={categoryList.map(category => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <div className="my-4 flex">
              <Button
                label="Proceed"
                style="danger"
                type="submit"
                onClick={() => setShowModal(false)}
              />
              <Button
                label="Cancel"
                style="text"
                type="cancel"
                onClick={() => setShowModal(false)}
              />
            </div>
          </FormikForm>
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
