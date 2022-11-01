import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import articlesApi from "apis/articles";
import { formatDateToDayMonthYear } from "components/Dashboard/utils";

const ShowArticle = ({ slug }) => {
  const [articleDetails, setArticleDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchArticleDetails = async () => {
    try {
      const { data: article } = await articlesApi.showWithSlug(slug);
      setArticleDetails({
        title: article.title,
        bodyParagraphs: article.body.split("\n"),
        categoryName: article.category.name,
        publishedDate: article.updated_at,
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticleDetails();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="m-8 w-3/4">
      <Typography style="h1">{articleDetails.title}</Typography>
      <div className="mt-2 flex">
        <Typography
          className="neeto-ui-rounded neeto-ui-bg-primary-100 neeto-ui-text-primary-800 mr-4 py-1 px-3"
          style="h5"
        >
          {articleDetails.categoryName}
        </Typography>
        <Typography className="neeto-ui-text-gray-400 p-1" style="h5">
          {formatDateToDayMonthYear(articleDetails.publishedDate)}
        </Typography>
      </div>
      <div className="py-4">
        {articleDetails.bodyParagraphs.map((paragraph, index) => (
          <Typography key={index} style="body2">
            {paragraph || <br />}
          </Typography>
        ))}
      </div>
    </div>
  );
};

export default ShowArticle;
