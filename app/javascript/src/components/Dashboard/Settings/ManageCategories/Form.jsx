import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoryApi from "apis/admin/categories";
import TooltipWrapper from "components/Common/TooltipWrapper";
import { useKey } from "hooks/forms/useKey";

const Form = ({
  refetch,
  initialValues,
  validationSchema,
  isEdit,
  id,
  setIsEdit,
  setAddCategory,
}) => {
  const [submitted, setSubmitted] = useState(false);

  useKey("Escape", () => {
    isEdit ? setIsEdit(false) : setAddCategory(false);
  });

  const handleSubmit = async category => {
    try {
      isEdit
        ? (await categoryApi.update(id, category), setIsEdit(false))
        : (await categoryApi.create(category), setAddCategory(false));
    } catch (error) {
      setAddCategory(false);
      logger.error(error);
    }
    refetch();
    setSubmitted(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <FormikForm>
          <Input
            required
            name="name"
            type="text"
            suffix={
              <>
                <TooltipWrapper
                  content="Make changes to to update"
                  disabled={isSubmitting || (isEdit && !(isValid && dirty))}
                  followCursor="horizontal"
                  position="bottom"
                >
                  <Button
                    className="h-8"
                    disabled={isSubmitting || (isEdit && !(isValid && dirty))}
                    icon={Check}
                    style="text"
                    type="submit"
                  />
                </TooltipWrapper>
                <Button
                  icon={Close}
                  style="text"
                  type="reset"
                  onClick={() =>
                    isEdit ? setIsEdit(false) : setAddCategory(false)
                  }
                />
              </>
            }
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
