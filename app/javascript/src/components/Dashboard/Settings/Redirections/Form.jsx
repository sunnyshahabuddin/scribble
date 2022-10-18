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
    if (values.to !== values.from) {
      try {
        isEdit
          ? ((await redirectionsApi.update(values.id, {
              from: values.from,
              to: values.to,
            }),
            Toastr.success("Redirection updated successfully")),
            setIsEdit(false))
          : (await redirectionsApi.create(values),
            setAddRedirection(false),
            Toastr.success("Redirection created successfully"));
      } catch (error) {
        setAddRedirection(false);
        logger.error(error);
      }
      refetch();
    } else {
      Toastr.error("From and To cannot be same");
    }
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
