import React, { useState, useEffect } from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";
import { NavLink, useLocation } from "react-router-dom";

import articlesApi from "apis/admin/articles";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const [articleDetails, setArticleDetails] = useState([]);

  const { pathname } = useLocation();
  const isEditArticle = pathname.includes("edit");

  useEffect(() => {
    fetchArticle();
  }, [isEditArticle]);

  const fetchArticle = async () => {
    if (isEditArticle) {
      try {
        const article = await articlesApi.show(pathname.split("/")[2]);
        setArticleDetails(article.data);
      } catch (error) {
        logger.error(error);
      } finally {
        setLoading(false);
      }
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
    <nav className="sticky top-0 z-50 flex h-16 border-b-2 bg-white px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex">
          <Typography style="h4">Scribble</Typography>
          <NavLink
            exact
            activeClassName="neeto-ui-text-primary-500 mx-6"
            className="neeto-ui-text-gray-500 mx-6"
            to="/"
          >
            <Typography style="h4">Articles</Typography>
          </NavLink>
          <NavLink
            activeClassName="neeto-ui-text-primary-500"
            className="neeto-ui-text-gray-500"
            to="/settings?tab=general"
          >
            <Typography style="h4">Settings</Typography>
          </NavLink>
          <NavLink
            activeClassName="neeto-ui-text-primary-500 mx-6"
            className="neeto-ui-text-gray-500 mx-6"
            to="/analytics"
          >
            <Typography style="h4">Analytics</Typography>
          </NavLink>
        </div>
        <div className="flex">
          {pathname.includes("edit") && (
            <div className="m-1 flex">
              {articleDetails.status === 0 ? (
                <Typography
                  className="neeto-ui-rounded neeto-ui-bg-warning-100 neeto-ui-text-warning-500 mr-4 py-1 px-3"
                  style="h5"
                >
                  Draft
                </Typography>
              ) : (
                <Typography
                  className="neeto-ui-rounded neeto-ui-bg-success-500 neeto-ui-text-white mr-4 py-1 px-3"
                  style="h5"
                >
                  Published
                </Typography>
              )}
            </div>
          )}
          <Button
            className="ml-2"
            icon={ExternalLink}
            label="Preview"
            style="secondary"
            target="_blank"
            to="/public"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
