import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import organizationApi from "apis/admin/organization";

import Form from "./Form";

const General = () => {
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizationDetails();
  }, []);

  const fetchOrganizationDetails = async () => {
    try {
      setLoading(true);
      const { data: organizationDetails } = await organizationApi.show();
      setOrganizationDetails({
        name: organizationDetails.name,
        isPasswordProtected: organizationDetails.is_password_protected,
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-1/3">
      <Typography style="h2">General Settings</Typography>
      <Typography className="neeto-ui-text-gray-600" style="body2">
        Configure general attributes of scribble.
      </Typography>
      <Form organizationDetails={organizationDetails} />
    </div>
  );
};

export default General;
