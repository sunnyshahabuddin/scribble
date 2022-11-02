import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import articlesApi from "apis/articles";

import Version from "./Version";

const VersionHistory = ({ articleDetails }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const [articleVersionDetails, setArticleVersionDetails] = useState([]);
  const fetchArticleVersionDetails = async () => {
    try {
      const {
        data: { article_versions },
      } = await articlesApi.articleVersions(articleDetails.id);
      const response = article_versions
        .map(articleVersion => articleVersion.object)
        .slice(1);
      setArticleVersionDetails(
        response.map(article => ({
          title: article.title,
          body: article.body,
          categoryId: article.category_id,
          date: article.updated_at,
          status: article.status,
        }))
      );
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };
  useEffect(() => {
    fetchArticleVersionDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="border-l h-screen w-1/3">
      <div className="mt-10 ml-4">
        <Typography style="h2">Version History</Typography>
        <Typography className="neeto-ui-text-gray-600 mt-1" style="body1">
          Version history of {articleDetails.title} in Scribble.
        </Typography>
      </div>
      {articleVersionDetails.map(articleVersion => (
        <div className="mt-4 ml-4 flex" key={articleVersion.date}>
          <Version articleDetails={articleVersion} />
        </div>
      ))}
    </div>
  );
};

export default VersionHistory;
