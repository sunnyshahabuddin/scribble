import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Button } from "neetoui";
import { Input, Checkbox } from "neetoui/formik";
import * as yup from "yup";

import organizationApi from "apis/admin/organization";
import TooltipWrapper from "components/Common/TooltipWrapper";

const Form = ({ organizationDetails }) => {
  const [checkedValue, setCheckedValue] = useState(
    organizationDetails.isPasswordProtected
  );
  const [changePassword, setChangePassword] = useState(false);
  const handleSubmit = async values => {
    try {
      await organizationApi.update({
        name: values.siteName,
        password: values.password,
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
      validateOnChange
      initialValues={{
        siteName: organizationDetails.name,
        isPasswordProtected: organizationDetails.isPasswordProtected,
        isPasswordChanged: true,
      }}
      validationSchema={yup.object().shape({
        siteName: yup.string().required("Title is required"),
        isPasswordProtected: yup.boolean(),
        password: yup
          .string()
          .when("isPasswordChanged", {
            is: false,
            then: yup.string().notRequired(),
          })
          .when("isPasswordChanged", {
            is: true,
            then: yup.string().when("isPasswordProtected", {
              is: true,
              then: yup
                .string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters")
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/,
                  "Password must have one letter and one number"
                ),
            }),
          }),
      })}
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
                  !changePassword && organizationDetails.isPasswordPresent
                }
                placeholder={
                  changePassword || !organizationDetails.isPasswordPresent
                    ? "Enter a six letter password with one number"
                    : "********"
                }
              />
              {organizationDetails.isPasswordPresent && (
                <Button
                  className="h-7 mt-12 mb-2 ml-1"
                  disabled={changePassword}
                  label="Change Password"
                  size="small"
                  onClick={() => {
                    setChangePassword(true);
                    setFieldValue("isPasswordChanged", true);
                  }}
                />
              )}
            </div>
          )}
          <div className="mt-6 flex">
            <TooltipWrapper
              content="Make changes to to save"
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
