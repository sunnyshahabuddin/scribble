import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Checkbox, Button } from "neetoui";
import { Input } from "neetoui/formik";

import websitesApi from "apis/websites";

const Form = ({ websiteDetails }) => {
  const [checkedValue, setCheckedValue] = useState(false);
  const handleSubmit = async values => {
    try {
      await websitesApi.update(websiteDetails.id, {
        name: values.siteName,
        password_digest: checkedValue ? values.password : null,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ siteName: websiteDetails.name }}
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
