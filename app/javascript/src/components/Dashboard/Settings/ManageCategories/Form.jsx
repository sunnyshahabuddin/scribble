import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

const Form = () => (
  <Formik
    initialValues={{ fromPath: "", toPath: "" }}
    //validateOnBlur={submitted}
    //validateOnChange={submitted}
    //validationSchema={VALIDATION_SCHEMA}
    //onSubmit={handleSubmit}
  >
    <div className="mt-2">
      <FormikForm className="flex">
        <Input
          required
          className="mx-2 w-2/5"
          name="fromPath"
          suffix={<Button icon={Check} style="text" />}
          type="text"
        />
      </FormikForm>
    </div>
  </Formik>
);

export default Form;
