import React from "react";

import articlesApi from "apis/articles";
import { FORM_INITIAL_VALUES } from "components/Dashboard/constants";
import { LANDING_PAGE_PATH } from "components/routeConstants";

import Form from "./Form";

const Create = ({ history }) => {
  const handleSubmit = async article => {
    const { title, body, status } = article;
    const category_id = article.category.value;
    const payload = {
      title,
      body,
      category_id,
      status,
    };
    try {
      await articlesApi.create(payload);
      history.push(LANDING_PAGE_PATH);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="h-1/2 mx-auto mt-12 flex w-1/2">
      <Form article={FORM_INITIAL_VALUES} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Create;
