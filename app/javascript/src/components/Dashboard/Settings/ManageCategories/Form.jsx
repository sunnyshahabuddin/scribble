import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import categoryApi from "apis/categories";

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
