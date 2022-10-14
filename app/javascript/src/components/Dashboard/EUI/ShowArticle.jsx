import React from "react";

import { Typography } from "neetoui";

const ShowArticle = ({ articleTitle, categoryTitle, publishedDate, body }) => (
  <div className="m-8 w-3/4">
    <Typography style="h1">{articleTitle}</Typography>
    <div className="mt-2 flex">
      <Typography
        className="neeto-ui-rounded neeto-ui-bg-primary-100 neeto-ui-text-primary-800 mr-4 py-1 px-3"
        style="h5"
      >
        {categoryTitle}
      </Typography>
      <Typography className="neeto-ui-text-gray-400 p-1" style="h5">
        {publishedDate}
      </Typography>
    </div>
    <Typography className="mt-6" style="body2">
      {body}
    </Typography>
  </div>
);

export default ShowArticle;
