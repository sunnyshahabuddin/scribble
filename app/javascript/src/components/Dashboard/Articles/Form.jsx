import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import {
  CATEGORIES,
  FORM_INITIAL_VALUES,
  VALIDATION_SCHEMA,
} from "components/Dashboard/constants";

const { Menu, MenuItem } = Dropdown;
const listSaveStatus = ["Publish", "Save Draft"];

const Form = ({ handleSubmit }) => {
  const [dropdownLabel, setDropdownLabel] = useState("Save Draft");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={VALIDATION_SCHEMA}
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
