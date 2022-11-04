import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import redirectionsApi from "apis/admin/redirections";
import TooltipWrapper from "components/Common/TooltipWrapper";
import { useKey } from "hooks/forms/useKey";

import { formValidationSchema } from "./constants";

const Form = ({
  isEdit,
  setIsEdit,
  initialValues,
  refetch,
  redirectionsList,
  setAddRedirection,
}) => {
  const [fromValue, setFromValue] = useState(initialValues.from);

  useKey("Escape", () => {
    isEdit ? setIsEdit(false) : setAddRedirection(false);
  });

  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await redirectionsApi.update(values.id, {
          from: values.from,
          to: values.to,
        }),
          setIsEdit(false);
      } else {
        await redirectionsApi.create({
          from: values.from,
          to: values.to,
        });
        setAddRedirection(false);
      }
    } catch (error) {
      setAddRedirection(false);
      logger.error(error);
    }
    refetch();
  };

  return (
    <Formik
      validateOnChange
      initialValues={initialValues}
      validationSchema={formValidationSchema(redirectionsList, fromValue)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, setFieldValue }) => (
        <FormikForm className="mt-2 flex w-full bg-white p-4">
          <Input
            required
            className="mx-2 w-2/5"
            name="from"
            placeholder="Enter to path with /"
            type="text"
            value={fromValue}
            onChange={e => (
              setFromValue(e.target.value),
              setFieldValue("from", e.target.value)
            )}
          />
          <Input
            required
            className="ml-2 w-2/5"
            name="to"
            placeholder="Enter from path with /"
            type="text"
          />
          <TooltipWrapper
            content="Make changes to to update"
            disabled={isSubmitting || (isEdit && !dirty)}
            followCursor="horizontal"
            position="bottom"
          >
            <Button
              className="h-8"
              disabled={isSubmitting || (isEdit && !dirty)}
              icon={Check}
              style="text"
              type="submit"
            />
          </TooltipWrapper>
          <Button
            className="h-8"
            icon={Close}
            style="text"
            type="reset"
            onClick={() =>
              isEdit ? setIsEdit(false) : setAddRedirection(false)
            }
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
