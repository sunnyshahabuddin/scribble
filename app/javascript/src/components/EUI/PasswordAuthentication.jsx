import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import organizationApi from "apis/admin/organization";
import { setAuthHeaders } from "apis/axios";
import EuiPassword from "images/EuiPassword";

const PasswordAuthentication = ({ organizationName }) => {
  const handleSubmit = async values => {
    try {
      const response = await organizationApi.login({
        password: values.password,
      });
      localStorage.setItem(
        "authToken",
        JSON.stringify(response.data.authentication_token)
      );
      setAuthHeaders();
      window.location.href = "/public";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <div className="flex h-12 w-full justify-center border-b-2 py-3">
        <Typography style="h4">{organizationName}</Typography>
      </div>
      <div className="mt-16 grid justify-center">
        <img className="mx-auto justify-center" src={EuiPassword} />
        <Typography className="mt-8" style="h2">
          {organizationName} is password protected!
        </Typography>
        <Typography style="body1">
          Enter the password to gain access to {organizationName}.
        </Typography>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={yup.object().shape({
            password: yup.string().required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          <FormikForm className="mt-8">
            <Input
              required
              label="Password"
              name="password"
              placeholder="Enter password to continue"
              type="password"
            />
            <Button className="mt-6" label="Continue" type="submit" />
          </FormikForm>
        </Formik>
      </div>
    </>
  );
};

export default PasswordAuthentication;
