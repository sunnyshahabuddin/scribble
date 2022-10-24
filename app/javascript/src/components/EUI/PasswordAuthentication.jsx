import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import { setAuthHeaders } from "apis/axios";
import organizationApi from "apis/organization";
import EuiPassword from "images/EuiPassword";

import Header from "./Header";

const PasswordAuthentication = ({ websiteDetails, setIsPasswordValidated }) => {
  const handleSubmit = async values => {
    try {
      const response = await organizationApi.login({
        password: values.password,
      });
      localStorage.setItem(
        "authToken",
        JSON.stringify({ token: response.data.authentication_token })
      );
      setAuthHeaders();
      setIsPasswordValidated(true);
      window.location.href = "/public";
    } catch (error) {
      Toastr.error("Invalid password");
      logger.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="mt-16 grid justify-center">
        <img className="mx-auto justify-center" src={EuiPassword} />
        <Typography className="mt-8" style="h2">
          {websiteDetails.name} is password protected!
        </Typography>
        <Typography style="body1">
          Enter the password to gain access to {websiteDetails.name}.
        </Typography>
        <Formik
          initialValues={{ password: "" }}
          validationSchema={yup.object().shape({
            password: yup.string().required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          <FormikForm className="mt-8">
            <Input required label="Password" name="password" type="password" />
            <Button className="mt-6" label="continue" type="submit" />
          </FormikForm>
        </Formik>
      </div>
    </>
  );
};

export default PasswordAuthentication;
