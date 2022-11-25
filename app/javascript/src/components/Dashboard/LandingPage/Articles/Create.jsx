import React, { useState } from "react";

import articlesApi from "apis/admin/articles";
import { LANDING_PAGE_PATH } from "components/routeConstants";

import { FORM_INITIAL_VALUES, CREATE_ARTICLE_STATUS } from "./constants";
import Form from "./Form";
import ScheduleLater from "./ScheduleLater";

const Create = ({ history }) => {
  const [showScheduleLater, setShowScheduleLater] = useState(false);
  const [formValues, setFormValues] = useState({});
  const handleSubmit = async article => {
    const { title, body, status } = article;
    const category_id = article.category.value;
    const payload = {
      title,
      body,
      category_id,
      status,
    };
    if (status === 0 || status === 1) {
      payload.schedule_at = null;
      payload.schedule_status = null;
      try {
        await articlesApi.create(payload);
        history.push(LANDING_PAGE_PATH);
      } catch (error) {
        logger.error(error);
      }
    } else {
      setFormValues(payload);
      setShowScheduleLater(true);
    }
  };

  return (
    <>
      <div className="h-1/2 mx-auto mt-12 flex w-1/2">
        <Form
          article={FORM_INITIAL_VALUES}
          articleStatus={CREATE_ARTICLE_STATUS}
          handleSubmit={handleSubmit}
        />
      </div>
      {showScheduleLater && (
        <ScheduleLater
          formValues={formValues}
          setShowSchedule={setShowScheduleLater}
          showSchedule={showScheduleLater}
        />
      )}
    </>
  );
};

export default Create;
