import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";

import redirectionsApi from "apis/admin/redirections";

import { REDIRECTION_HEADER } from "./constants";
import Form from "./Form";
import Row from "./Row";

const Redirections = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [redirectionsList, setRedirectionsList] = useState([]);
  const [addRedirection, setAddRedirection] = useState(false);

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
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-1/2">
      <Typography style="h2">Redirections</Typography>
      <Typography className="neeto-ui-text-gray-600" style="body1">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="neeto-ui-bg-primary-100 mt-2 w-full p-6">
        <div className="flex items-center justify-between">
          {REDIRECTION_HEADER.map(title => (
            <Typography key={title.id} style="h5">
              {title.value}
            </Typography>
          ))}
        </div>
        {redirectionsList.map(redirection => (
          <Row
            key={redirection.id}
            redirectionItem={redirection}
            redirectionsList={redirectionsList}
            refetch={fetchRedirectionsDetails}
          />
        ))}
        {addRedirection && (
          <Form
            initialValues={{ from: "/", to: "/" }}
            isEdit={false}
            refetch={fetchRedirectionsDetails}
            setAddRedirection={setAddRedirection}
          />
        )}
        <Button
          className="mt-2"
          icon={Plus}
          iconPosition="left"
          label="Add new redirections"
          style="link"
          onClick={() => setAddRedirection(true)}
        />
      </div>
    </div>
  );
};

export default Redirections;
