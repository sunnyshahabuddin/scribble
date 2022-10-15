import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import websitesApi from "apis/websites";

const Header = () => {
  const [websiteName, setWebsiteName] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchWebsiteDetails();
  }, []);
  const fetchWebsiteDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { websites },
      } = await websitesApi.fetch();
      setWebsiteName(websites[0]);
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
      <Typography style="h4">{websiteName.name}</Typography>
    </div>
  );
};

export default Header;
