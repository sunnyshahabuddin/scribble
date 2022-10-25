import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import organizationApi from "apis/organization";

const Header = () => {
  const [organizationName, setOrganizationName] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchWebsiteDetails();
  }, []);
  const fetchWebsiteDetails = async () => {
    try {
      setLoading(true);
      const response = await organizationApi.show();
      setOrganizationName(response.data.name);
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
    <div className="flex h-12 w-full justify-center border-b-2 py-3">
      <Typography style="h4">{organizationName}</Typography>
    </div>
  );
};

export default Header;
