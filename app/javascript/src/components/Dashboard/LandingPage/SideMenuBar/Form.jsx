import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoryApi from "apis/categories";

import { FORM_INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";

const Form = ({ setIsCategoryAddCollapsed, refetch }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async category => {
    try {
      await categoryApi.create(category);
    } catch (error) {
      logger.error(error);
    }
    setIsCategoryAddCollapsed(true);
    refetch();
    setSubmitted(true);
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
        <FormikForm>
          <Input
            required
            name="name"
            type="text"
            suffix={
              <>
                <Button
                  disabled={isSubmitting}
                  icon={Check}
                  style="text"
                  type="submit"
                />
                <Button
                  icon={Close}
                  style="text"
                  type="reset"
                  onClick={() => setIsCategoryAddCollapsed(true)}
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
