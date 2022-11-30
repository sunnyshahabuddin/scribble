import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";

import { formatToDateAndTime } from "components/Dashboard/utils";

const renderTitle = (title, articleId) => (
  <Link to={`/articles/${articleId}/edit`}>
    <Typography className="text-indigo-500" style="h5">
      {title}
    </Typography>
  </Link>
);

const renderDateTime = dateTime => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {dateTime ? formatToDateAndTime(dateTime) : "--"}
  </Typography>
);

export const buildTableColumnData = [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "50%",
    render: (title, { articleId }) => renderTitle(title, articleId),
  },
  {
    title: "PUBLISH AT",
    dataIndex: "publishAt",
    key: "publishAt",
    width: "25%",
    render: publishAt => renderDateTime(publishAt),
  },
  {
    title: "UNPUBLISH AT",
    dataIndex: "unpublishAt",
    key: "unpublishAt",
    width: "25%",
    render: unpublishAt => renderDateTime(unpublishAt),
  },
];
