import React from "react";

import articlesApi from "apis/articles";
import { LANDING_PAGE_PATH } from "components/routeConstants";

import Form from "./Form";

const Create = ({ history }) => {
  const handleSubmit = async article => {
    try {
      await articlesApi.create(article);
      history.push(LANDING_PAGE_PATH);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="h-1/2 mx-auto mt-12 flex w-1/2">
      <Form handleSubmit={handleSubmit} />
    </div>
  );
};

export default Create;
