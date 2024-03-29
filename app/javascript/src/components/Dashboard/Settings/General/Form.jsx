import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";

import organizationApi from "apis/admin/organization";
import TooltipWrapper from "components/Common/TooltipWrapper";

import { formValidationSchema } from "./constants";

const Form = ({ organizationDetails, refetch }) => {
  const [checkedValue, setCheckedValue] = useState(
    organizationDetails.isPasswordProtected
  );
  const [changePassword, setChangePassword] = useState(
    !organizationDetails.isPasswordProtected
  );

  const handleSubmit = async values => {
    const payload = {
      name: values.siteName,
      password: values.isPasswordProtected ? values.password : null,
      is_password_protected: values.isPasswordProtected,
    };
    if (payload.password === undefined) {
      delete payload.password;
    }
    try {
      await organizationApi.update(payload);
      localStorage.setItem("authToken", null);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Formik
      validateOnChange
      validationSchema={formValidationSchema(checkedValue, changePassword)}
      initialValues={{
        siteName: organizationDetails.name,
        isPasswordProtected: organizationDetails.isPasswordProtected,
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, setFieldValue }) => (
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
                id="password"
                label="Password"
                name="password"
                type="password"
                disabled={
                  !changePassword && organizationDetails.isPasswordProtected
                }
                placeholder={
                  changePassword || !organizationDetails.isPasswordProtected
                    ? "Enter a six letter password with one number"
                    : "********"
                }
              />
              {organizationDetails.isPasswordProtected && (
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
            <TooltipWrapper
              content="Make changes to save"
              disabled={isSubmitting || !dirty}
              followCursor="horizontal"
              position="bottom"
            >
              <Button
                disabled={isSubmitting || !dirty}
                label="Save Changes"
                type="submit"
              />
            </TooltipWrapper>
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={() => setChangePassword(false)}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
