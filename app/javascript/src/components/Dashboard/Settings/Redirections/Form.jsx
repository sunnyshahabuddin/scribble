import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import redirectionsApi from "apis/redirections";

const Form = ({
  isEdit,
  setIsEdit,
  initialValues,
  refetch,
  setAddRedirection,
}) => {
  const handleSubmit = async values => {
    try {
      isEdit
        ? (await redirectionsApi.update(values.id, {
            from: values.from,
            to: values.to,
          }),
          setIsEdit(false))
        : (await redirectionsApi.create(values), setAddRedirection(false));
    } catch (error) {
      Toastr.warning("Category already exists");
      setAddRedirection(false);
      logger.error(error);
    }
    refetch();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div className="mt-2 bg-white p-4">
        <FormikForm className="flex">
          <Input required className="mx-2 w-2/5" name="from" type="text" />
          <Input required className="w-2/5" name="to" type="text" />
          <Button icon={Check} style="text" type="submit" />
        </FormikForm>
      </div>
    </Formik>
  );
};

export default Form;
