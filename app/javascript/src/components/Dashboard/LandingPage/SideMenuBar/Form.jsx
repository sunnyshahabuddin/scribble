import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoryApi from "apis/categories";

import { FORM_INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";

const Form = ({ setIsCategoryAddCollapsed }) => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async category => {
    try {
      await categoryApi.create(category);
    } catch (error) {
      logger.error(error);
    }
    setIsCategoryAddCollapsed(true);
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
      <FormikForm>
        <Input
          required
          name="name"
          suffix={<Button icon={Check} style="text" type="submit" />}
          type="text"
        />
      </FormikForm>
    </Formik>
  );
};

export default Form;
