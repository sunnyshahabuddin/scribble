import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Typography, Checkbox, Button } from "neetoui";
import { Input } from "neetoui/formik";

const General = () => {
  const [checkedValue, setCheckedValue] = useState(false);

  return (
    <div className="mx-auto mt-6 w-1/3">
      <Typography style="h2">General Settings</Typography>
      <Typography className="neeto-ui-text-gray-600" style="body2">
        Configure general attributes of scribble.
      </Typography>
      <Formik initialValues={({ siteName: "" }, { password: "" })}>
        <FormikForm>
          <div className="border-b-2 pb-4">
            <Input
              required
              className="mt-6 mb-px"
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
    </div>
  );
};

export default General;
