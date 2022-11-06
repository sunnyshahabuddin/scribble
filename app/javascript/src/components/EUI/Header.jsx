import React, { useState, useEffect } from "react";

import { Search } from "neetoicons";
import { Typography, PageLoader, Kbd } from "neetoui";

import organizationApi from "apis/admin/organization";
import articlesApi from "apis/public/articles";

import SearchModal from "./SearchModal";

const Header = ({ categoryList, setActiveArticleIndex }) => {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [organizationName, setOrganizationName] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const keysPressed = {};

  useEffect(() => {
    window.addEventListener("keydown", event => {
      keysPressed[event.key] = true;
      if (
        (keysPressed["Control"] || keysPressed["Meta"]) &&
        event.key === "k"
      ) {
        setShowSearch(true);
      } else if (event.key === "Escape") {
        setShowSearch(false);
      }
      window.removeEventListener("keydown", event);
    });
    fetchOrganizationAndPublishedArticles();
  }, [showSearch]);

  const fetchOrganizationAndPublishedArticles = async () => {
    try {
      const response = await organizationApi.show();
      const {
        data: { articles: publishedArticles },
      } = await articlesApi.fetch();
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
          className="border neeto-ui-rounded-sm mt-2 ml-4 h-8 w-1/4 cursor-pointer pl-2 pt-1"
          onClick={() => setShowSearch(true)}
        >
          <div className="flex justify-between">
            <Typography className="neeto-ui-text-gray-400 flex">
              <Search />
              Search for articles here
            </Typography>
            <div className="flex gap-x-px">
              <Kbd keyName="⌘" />
              <Kbd className="mr-1" keyName="K" />
            </div>
          </div>
        </div>
        <Typography className="flex w-full justify-center py-3" style="h4">
          {organizationName}
        </Typography>
      </div>
      {showSearch && (
        <SearchModal
          categoryList={categoryList}
          publishedArticles={publishedArticles}
          setActiveArticleIndex={setActiveArticleIndex}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />
      )}
    </>
  );
};

export default Header;
