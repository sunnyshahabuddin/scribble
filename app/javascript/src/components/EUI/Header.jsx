import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import articlesApi from "apis/articles";
import organizationApi from "apis/organization";

import SearchModal from "./SearchModal";

const Header = () => {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [organizationName, setOrganizationName] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebsiteAndPublishedArticleDetails();
  }, []);

  const fetchWebsiteAndPublishedArticleDetails = async () => {
    try {
      setLoading(true);
      const response = await organizationApi.show();
      const {
        data: { articles: publishedArticles },
      } = await articlesApi.listPublishedArticles();
      setOrganizationName(response.data.name);
      setPublishedArticles(publishedArticles);
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
    <>
      <div className="flex h-12 border-b-2">
        <div
          className="border neeto-ui-rounded-sm mt-2 ml-4 h-8 w-64 pl-2 pt-1"
          onClick={() => setShowSearch(true)}
        >
          <Typography className="neeto-ui-text-gray-400">
            Search for articles here.
          </Typography>
        </div>
        <Typography className="flex w-full justify-center py-3" style="h4">
          {organizationName}
        </Typography>
      </div>
      {showSearch && (
        <SearchModal
          publishedArticles={publishedArticles}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />
      )}
    </>
  );
};

export default Header;
