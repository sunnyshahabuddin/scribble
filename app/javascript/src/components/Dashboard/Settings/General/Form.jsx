import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Checkbox, Button } from "neetoui";
import { Input } from "neetoui/formik";
import * as yup from "yup";

import websitesApi from "apis/websites";

const Form = ({ websiteDetails }) => {
  const [checkedValue, setCheckedValue] = useState(
    websiteDetails.password !== null
  );
  const handleSubmit = async values => {
    try {
      await websitesApi.update(websiteDetails.id, {
        name: values.siteName,
        password: checkedValue ? values.password : null,
      });
      localStorage.setItem("authToken", JSON.stringify({ token: null }));
      window.location.reload();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        siteName: websiteDetails.name,
        password: websiteDetails.password,
      }}
      validationSchema={yup.object().shape({
        siteName: yup.string().required("Title is required"),
        password: yup
          .string()
          .required("Password is required")
          .min(6, "Password is too short - should be 6 characters minimum.")
          .nullable(),
      })}
      onSubmit={handleSubmit}
    >
      <FormikForm>
        <div className="border-b-2 pb-4">
          <Input
            required
            className="mt-6 mb-px"
            id="siteName"
            label="Site Name"
            name="siteName"
            type="text"
          />
          <Typography className="neeto-ui-text-gray-500" style="body3">
            Customize the site name which is used to show the site name in
          </Typography>
          <Typography className="neeto-ui-text-gray-500" style="h6">
            Open Graph Tags.
          </Typography>
        </div>
        <Checkbox
          checked={checkedValue}
          className="mt-3"
          id="checkbox"
          label={
            <Typography className="neeto-ui-text-black ml-2" style="h4">
              Password Protect Knowledge Base
            </Typography>
          }
          onChange={() => setCheckedValue(checkedValue => !checkedValue)}
        />
        {checkedValue && (
          <Input
            required
            className="mt-6 mb-px"
            id="password"
            label="Password"
            name="password"
            type="password"
          />
        )}
        <div className="mt-6 flex">
          <Button label="Save Changes" type="submit" />
          <Button label="Cancel" style="text" type="cancel" />
        </div>
      </FormikForm>
    </Formik>
  );
};

export default Form;
