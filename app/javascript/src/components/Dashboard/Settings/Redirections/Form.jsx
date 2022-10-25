import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import redirectionsApi from "apis/redirections";

const Form = ({
  isEdit,
  setIsEdit,
  initialValues,
  refetch,
  redirectionsList,
  setAddRedirection,
}) => {
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
      initialValues={initialValues}
      validationSchema={yup.object().shape({
        from: yup
          .string()
          .notOneOf([yup.ref("to"), null], "To and From should not be equal")
          .required("From Path is required"),
        to: yup
          .string()
          .notOneOf(
            redirectionsList.map(item => item.from),
            "From Path already exists"
          )
          .required("To Path is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <FormikForm className="mt-2 flex w-full bg-white p-4">
          <Input
            required
            className="mx-2 w-2/5"
            name="from"
            placeholder="Enter to path without /"
            type="text"
          />
          <Input
            required
            className="ml-2 w-2/5"
            name="to"
            placeholder="Enter from path without /"
            type="text"
          />
          <Button
            className="h-8"
            disabled={isSubmitting || (isEdit && !(isValid && dirty))}
            icon={Check}
            style="text"
            type="submit"
          />
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
