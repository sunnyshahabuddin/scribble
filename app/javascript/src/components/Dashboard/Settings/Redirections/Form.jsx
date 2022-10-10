import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

const Form = ({ setIsEdit }) => (
  <Formik
    initialValues={{ fromPath: "", toPath: "" }}
    //validateOnBlur={submitted}
    //validateOnChange={submitted}
    //validationSchema={VALIDATION_SCHEMA}
    //onSubmit={handleSubmit}
  >
    <div className="mt-2 bg-white p-4">
      <FormikForm className="flex">
        <Input required className="mx-2 w-2/5" name="fromPath" type="text" />
        <Input required className="w-2/5" name="toPath" type="text" />
        <Button icon={Check} style="text" onClick={() => setIsEdit(false)} />
      </FormikForm>
    </div>
  </Formik>
);

export default Form;
