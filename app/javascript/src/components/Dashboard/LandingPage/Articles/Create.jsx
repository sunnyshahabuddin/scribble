import React, { useState } from "react";

import articlesApi from "apis/admin/articles";
import { LANDING_PAGE_PATH } from "components/routeConstants";

import { FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";
import Schedule from "./Schedule";

const Create = ({ history }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const handleSubmit = async article => {
    const { title, body, status } = article;
    const category_id = article.category.value;
    const payload = {
      title,
      body,
      category_id,
      status,
    };
    if (status === 1 || status === 0) {
      try {
        await articlesApi.create(payload);
        history.push(LANDING_PAGE_PATH);
      } catch (error) {
        logger.error(error);
      }
    } else if (status === 2 || status === 3) {
      setShowSchedule(true);
    }
  };

  return (
    <>
      <div className="h-1/2 mx-auto mt-12 flex w-1/2">
        <Form article={FORM_INITIAL_VALUES} handleSubmit={handleSubmit} />
      </div>
      {showSchedule && (
        <Schedule
          setShowSchedule={setShowSchedule}
          showSchedule={showSchedule}
        />
      )}
    </>
  );
};

export default Create;
