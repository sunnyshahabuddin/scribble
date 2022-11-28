import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button, PageLoader } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import categoriesApi from "apis/admin/categories";
import TooltipWrapper from "components/Common/TooltipWrapper";

import { VALIDATION_SCHEMA, findStatus } from "./constants";

const { Menu, MenuItem } = Dropdown;

const Form = ({ article, submitButtonActions, handleSubmit }) => {
  const [dropdownLabel, setDropdownLabel] = useState(
    article.status === 0 ? "Save Draft" : "Publish"
  );
  const [submitted, setSubmitted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={VALIDATION_SCHEMA(categoryList)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, dirty }) => (
        <FormikForm className="w-full">
          <div className="space-between flex">
            <Input
              required
              className="mr-5"
              label="Article Title"
              name="title"
              placeholder="Enter Article Title"
            />
            <Select
              isSearchable
              required
              label="Category"
              name="category"
              placeholder="Select a Category"
              options={categoryList.map(category => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <Textarea
            required
            className="mt-6"
            label="Article Body"
            name="body"
            placeholder="Enter Article"
            rows={10}
          />
          <div className="mt-4 flex">
            <div className="flex">
              <TooltipWrapper
                content="Make changes to save"
                disabled={isSubmitting || !dirty}
                followCursor="horizontal"
                position="bottom"
              >
                <Button
                  className="mr-px"
                  disabled={isSubmitting || !dirty}
                  label={dropdownLabel}
                  loading={isSubmitting}
                  size="medium"
                  style="primary"
                  type="submit"
                  onClick={() => setSubmitted(true)}
                />
              </TooltipWrapper>
              <Dropdown disabled={isSubmitting} type="submit">
                <Menu>
                  {submitButtonActions.map(status => (
                    <MenuItem.Button
                      key={status.id}
                      onClick={() => {
                        setDropdownLabel(status.value);
                        setFieldValue("status", findStatus(status.value));
                      }}
                    >
                      {status.value}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button
              className="mx-2"
              label="Cancel"
              size="medium"
              style="text"
              to="/"
              type="reset"
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
