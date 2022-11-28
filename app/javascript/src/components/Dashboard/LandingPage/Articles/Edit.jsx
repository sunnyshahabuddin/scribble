import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import utilityFunctions from "components/Dashboard/LandingPage/utils";
import { LANDING_PAGE_PATH } from "components/routeConstants";
import ArticleDetailsContext from "contexts/articleContext";

import Callout from "./Callout";
import {
  EDIT_PUBLISHED_ARTICLE_STATUS,
  EDIT_DRAFT_ARTICLE_STATUS,
} from "./constants";
import Form from "./Form";
import ScheduleLater from "./ScheduleLater";
import VersionHistory from "./Version History";

const Edit = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [articleDetails, setArticleDetails] = useState({});
  const [articleVersions, setArticleVersions] = useState([]);
  const [showScheduleLater, setShowScheduleLater] = useState(false);

  const { id } = useParams();

  const handleSubmit = async article => {
    const payload = {
      title: article.title,
      body: article.body,
      status: article.status,
      categoryId: article.category.value,
      restoredAt: null,
    };
    if (article.status === 0 || article.status === 1) {
      try {
        await articlesApi.update({
          id,
          payload,
        });
        history.push(LANDING_PAGE_PATH);
      } catch (error) {
        logger.error(error);
      }
    } else if (article.status === 2 || article.status === 3) {
      setFormValues(payload);
      setShowScheduleLater(true);
    }
  };

  const fetchArticleDetailsAndVersions = async () => {
    try {
      const { data: article } = await articlesApi.show(id);
      setArticleDetails({
        ...article,
        articleId: article.id,
        restoredAt: article.restored_at,
        updatedAt: article.updated_at,
        publishAt: article.publish_at,
        unpublishAt: article.unpublish_at,
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
    <>
      <div className="flex">
        <div className="mx-auto mt-10 w-1/3">
          {(articleDetails.publishAt || articleDetails.unpublishAt) && (
            <Callout
              articleDetails={articleDetails}
              refetch={fetchArticleDetailsAndVersions}
            />
          )}
          <Form
            handleSubmit={handleSubmit}
            article={utilityFunctions.formatFetchedDataToInitialFormValue(
              articleDetails
            )}
            articleStatus={
              articleDetails.status === 0
                ? EDIT_DRAFT_ARTICLE_STATUS
                : EDIT_PUBLISHED_ARTICLE_STATUS
            }
          />
        </div>
        <ArticleDetailsContext.Provider value={articleDetails}>
          <VersionHistory articleVersions={articleVersions} />
        </ArticleDetailsContext.Provider>
      </div>
      {showScheduleLater && (
        <ScheduleLater
          isEdit
          articleId={id}
          formValues={formValues}
          refetch={fetchArticleDetailsAndVersions}
          setShowSchedule={setShowScheduleLater}
          showSchedule={showScheduleLater}
        />
      )}
    </>
  );
};

export default Edit;
