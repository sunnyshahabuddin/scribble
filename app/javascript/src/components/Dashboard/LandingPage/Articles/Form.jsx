import React, { useState, useEffect } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button, PageLoader } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import categoriesApi from "apis/categories";
import { VALIDATION_SCHEMA } from "components/Dashboard/constants";

const { Menu, MenuItem } = Dropdown;
const listSaveStatus = ["Publish", "Save Draft"];

const Form = ({ article, handleSubmit }) => {
  const [dropdownLabel, setDropdownLabel] = useState("Save Draft");
  const [submitted, setSubmitted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const fetchCategoriesDetails = async () => {
    try {
      const categories = await categoriesApi.fetch();
      setCategoryList(categories.data);
      setPageLoading(false);
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
    <Formik
      initialValues={article}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={VALIDATION_SCHEMA(categoryList)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <FormikForm className="w-full">
          <div className="space-between flex w-full">
            <Input
              required
              className="mr-5 w-full"
              label="Article Title"
              name="title"
              placeholder="Enter Article Title"
            />
            <Select
              isSearchable
              required
              className="w-full flex-grow-0"
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
            className="mt-6 w-full flex-grow-0"
            label="Article Body"
            name="body"
            placeholder="Enter Article"
            rows={10}
          />
          <div className="mt-4 flex items-center">
            <div className="flex">
              <Button
                className="mr-px"
                disabled={isSubmitting}
                label={dropdownLabel}
                loading={isSubmitting}
                size="medium"
                style="primary"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown className="mr-3" disabled={isSubmitting} type="submit">
                <Menu>
                  {listSaveStatus.map((status, idx) => (
                    <MenuItem.Button
                      key={idx}
                      onClick={() => {
                        setDropdownLabel(status);
                        setFieldValue(
                          "status",
                          status === "Save Draft" ? 0 : 1
                        );
                      }}
                    >
                      {status}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button
              className="mx-3"
              label="Cancel"
              size="medium"
              style="text"
              type="reset"
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
