import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";
import * as yup from "yup";

import organizationApi from "apis/organization";

const Form = ({ websiteDetails }) => {
  const [checkedValue, setCheckedValue] = useState(
    websiteDetails.isPasswordProtected
  );
  const [changePassword, setChangePassword] = useState(false);
  const handleSubmit = async values => {
    try {
      await organizationApi.update({
        name: values.siteName,
        password: checkedValue
          ? values.password
          : websiteDetails.password_digest,
        is_password_protected: values.isPasswordProtected,
      });
      localStorage.setItem("authToken", JSON.stringify({ token: null }));
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        siteName: websiteDetails.name,
        isPasswordProtected: websiteDetails.isPasswordProtected,
      }}
      validationSchema={yup.object().shape({
        siteName: yup.string().required("Title is required"),
        isPasswordProtected: yup.boolean(),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, isValid, setFieldValue }) => (
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
            id="isPasswordProtected"
            name="isPasswordProtected"
            label={
              <Typography className="neeto-ui-text-black ml-2" style="h4">
                Password Protect Knowledge Base
              </Typography>
            }
            onChange={() => {
              setCheckedValue(checkedValue => !checkedValue);
              setFieldValue("isPasswordProtected", !checkedValue);
            }}
          />
          {checkedValue && (
            <div className="flex">
              <Input
                required
                className="mt-6 mb-px"
                disabled={!changePassword}
                id="password"
                label="Password"
                minlength="6"
                name="password"
                type="password"
                placeholder={
                  changePassword
                    ? "Enter a six character password to proceed"
                    : "********"
                }
              />
              {websiteDetails.passwordDigest && (
                <Button
                  className="h-7 mt-12 mb-2 ml-1"
                  disabled={changePassword}
                  label="Change Password"
                  size="small"
                  onClick={() => setChangePassword(true)}
                />
              )}
            </div>
          )}
          <div className="mt-6 flex">
            <Button
              disabled={isSubmitting || !(isValid && dirty)}
              label="Save Changes"
              type="submit"
            />
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={() =>
                setChangePassword(changePassword => !changePassword)
              }
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
