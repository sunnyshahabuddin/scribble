import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";
import {
  CATEGORIES,
  FORM_INITIAL_VALUES,
  VALIDATION_SCHEMA,
} from "components/Dashboard/constants";

const { Menu, MenuItem } = Dropdown;
const listCategories = ["Publish", "Save Draft"];

const Form = () => {
  const [dropdownLabel, setDropdownLabel] = useState("Save Draft");
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();
  const handleSubmit = async article => {
    try {
      await articlesApi.create(article);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
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
              isClearable
              isSearchable
              required
              className="w-full flex-grow-0"
              label="Category"
              name="category"
              options={CATEGORIES}
              placeholder="Select a Category"
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
                  {listCategories.map((category, idx) => (
                    <MenuItem.Button
                      key={idx}
                      onClick={() => {
                        setDropdownLabel(category);
                      }}
                    >
                      {category}
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
