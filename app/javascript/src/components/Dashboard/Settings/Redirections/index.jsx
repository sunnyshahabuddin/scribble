import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import redirectionsApi from "apis/redirections";

import Table from "./Table";

const Redirections = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [redirectionsList, setRedirectionsList] = useState([]);
  const fetchRedirectionsDetails = async () => {
    try {
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setPageLoading(false);
      setRedirectionsList(redirections);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirectionsDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto mt-6 w-1/2">
      <Typography style="h2">Redirections</Typography>
      <Typography className="neeto-ui-text-gray-600" style="body1">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="neeto-ui-bg-primary-100 mt-2 p-6">
        <Table
          redirectionsList={redirectionsList}
          refetch={fetchRedirectionsDetails}
        />
      </div>
    </div>
  );
};

export default Redirections;
