import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import EuiPassword from "images/EuiPassword";

const PasswordAuthentication = () => (
  <div className="mt-16 grid justify-center">
    <img className="mx-auto justify-center" src={EuiPassword} />
    <Typography className="mt-8" style="h2">
      Spinkart is password protected!
    </Typography>
    <Typography style="body1">
      Enter the password to gain access to spinkart.
    </Typography>
    <Formik
      initialValues={{ password: "" }}
      validationSchema={yup.object().shape({
        password: yup.string().required("Password is required"),
      })}
      //onSubmit={handleSubmit}
    >
      <FormikForm className="mt-8">
        <Input required label="Password" name="password" type="password" />
        <Button className="mt-6" label="continue" type="submit" />
      </FormikForm>
    </Formik>
  </div>
);

export default PasswordAuthentication;
