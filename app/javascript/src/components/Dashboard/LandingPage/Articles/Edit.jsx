import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/admin/articles";
import utilityFunctions from "components/Dashboard/LandingPage/utils";
import { keysToCamelCase } from "components/Dashboard/utils";
import { LANDING_PAGE_PATH } from "components/routeConstants";
import ArticleDetailsContext from "contexts/articleContext";

import Callout from "./Callout";
import ConfirmationAlert from "./ConfirmationAlert";
import Form from "./Form";
import ScheduleLater from "./ScheduleLater";
import { findButtonActions } from "./utils";
import VersionHistory from "./Version History";

const Edit = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [articleDetails, setArticleDetails] = useState({});
  const [articleVersions, setArticleVersions] = useState([]);
  const [showScheduleLater, setShowScheduleLater] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

  const { id } = useParams();

  const handleSubmit = async article => {
    const payload = {
      title: article.title,
      body: article.body,
      status: article.status,
      categoryId: article.category.value,
      restoredAt: null,
    };
    if (
      (article.status === 0 && !articleDetails.schedule.unpublishAt) ||
      (article.status === 1 && !articleDetails.schedule.publishAt)
    ) {
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
    } else {
      setFormValues(payload);
      setShowConfirmationAlert(true);
    }
  };

  const fetchArticleDetailsAndVersions = async () => {
    try {
      const { data: article } = await articlesApi.show(id);
      setArticleDetails(keysToCamelCase(article));
      const {
        data: { article_versions },
      } = await articlesApi.articleVersions(id);
      setArticleVersions(keysToCamelCase(article_versions).slice(1));
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
          {articleDetails.schedule?.publishAt && (
            <Callout articleDetails={articleDetails} message="published" />
          )}
          {articleDetails.schedule?.unpublishAt && (
            <Callout articleDetails={articleDetails} message="unpublished" />
          )}
          <Form
            handleSubmit={handleSubmit}
            submitButtonActions={findButtonActions(articleDetails)}
            article={utilityFunctions.formatFetchedDataToInitialFormValue(
              articleDetails
            )}
          />
        </div>
        <ArticleDetailsContext.Provider value={articleDetails}>
          <VersionHistory articleVersions={articleVersions} />
        </ArticleDetailsContext.Provider>
      </div>
      {showScheduleLater && (
        <ScheduleLater
          articleDetails={articleDetails}
          formValues={formValues}
          setShowSchedule={setShowScheduleLater}
          showSchedule={showScheduleLater}
        />
      )}
      {showConfirmationAlert && (
        <ConfirmationAlert
          articleDetails={articleDetails}
          formValues={formValues}
          setShowConfirmationAlert={setShowConfirmationAlert}
          showConfirmationAlert={showConfirmationAlert}
        />
      )}
    </>
  );
};

export default Edit;
