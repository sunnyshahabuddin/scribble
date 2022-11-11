import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import utilityFunctions from "components/Dashboard/LandingPage/utils";
import { LANDING_PAGE_PATH } from "components/routeConstants";

import Form from "./Form";
import VersionHistory from "./Version History";

const Edit = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [articleDetails, setArticleDetails] = useState({});
  const [articleVersions, setArticleVersions] = useState([]);

  const { id } = useParams();

  const handleSubmit = async article => {
    try {
      await articlesApi.update({
        id,
        payload: {
          title: article.title,
          body: article.body,
          status: article.status ? article.status : 0,
          category_id: article.category.value,
          restored_at: null,
        },
      });
      history.push(LANDING_PAGE_PATH);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticleDetailsAndVersions = async () => {
    try {
      const article = await articlesApi.show(id);
      setArticleDetails({
        ...article.data,
        restoredAt: article.data.restored_at,
      });
      const {
        data: { article_versions },
      } = await articlesApi.articleVersions(id);
      const articleVersions = article_versions
        .map(articleVersion => ({
          id: articleVersion.id,
          article: articleVersion.object,
          category: articleVersion.category,
        }))
        .slice(1);
      setArticleVersions(articleVersions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetailsAndVersions();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="mx-auto mt-10 w-1/3">
        <Form
          handleSubmit={handleSubmit}
          article={utilityFunctions.formatFetchedDataToInitialFormValue(
            articleDetails
          )}
        />
      </div>
      <VersionHistory
        articleDetails={articleDetails}
        articleVersions={articleVersions}
      />
    </div>
  );
};

export default Edit;
