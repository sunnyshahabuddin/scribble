import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button, Pane, Typography } from "neetoui";
import { Input } from "neetoui/formik";

import categoryApi from "apis/admin/categories";
import TooltipWrapper from "components/Common/TooltipWrapper";
import { useKey } from "hooks/forms/useKey";

import { FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({
  refetch,
  initialValues,
  isEdit,
  id,
  setShowPane,
  showPane,
}) => {
  const [submitted, setSubmitted] = useState(false);

  useKey("Escape", () => {
    setShowPane(false);
  });

  const handleSubmit = async category => {
    try {
      isEdit
        ? await categoryApi.update(id, category)
        : await categoryApi.create(category);
    } catch (error) {
      logger.error(error);
    }
    refetch();
    setShowPane(false);
    setSubmitted(true);
  };

  return (
    <Pane isOpen={showPane} onClose={() => setShowPane(false)}>
      <Pane.Header>
        <Typography style="h2">Add category</Typography>
      </Pane.Header>
      <Formik
        initialValues={initialValues}
        validateOnBlur={submitted}
        validateOnChange={submitted}
        validationSchema={FORM_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <FormikForm>
            <Pane.Body>
              <Input
                required
                className="w-full"
                label="Category name"
                name="name"
                placeholder="Enter category name"
                type="text"
              />
            </Pane.Body>
            <Pane.Footer>
              <TooltipWrapper
                content="Make changes to to update"
                disabled={isSubmitting || (isEdit && !(isValid && dirty))}
                followCursor="horizontal"
                position="bottom"
              >
                <Button
                  className="mr-4 h-8"
                  disabled={isSubmitting || (isEdit && !(isValid && dirty))}
                  icon={Check}
                  label={isEdit ? "Update category" : "Add category"}
                  type="submit"
                />
              </TooltipWrapper>
              <Button
                icon={Close}
                label="Cancel"
                style="text"
                type="reset"
                onClick={() => setShowPane(false)}
              />
            </Pane.Footer>
          </FormikForm>
        )}
      </Formik>
    </Pane>
  );
};

export default Form;
