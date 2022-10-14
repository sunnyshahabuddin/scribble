import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

import { formatDateToMonthDayYear } from "components/Dashboard/utils";

const renderStatus = status => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {status === 0 ? "Draft" : "Published"}
  </Typography>
);

const renderTitle = title => (
  <Typography className="text-indigo-500" style="h5">
    {title}
  </Typography>
);

const renderDeleteEditButton = (slug, destroyArticle) => (
  <div className="flex">
    <Button icon={Delete} style="text" onClick={() => destroyArticle(slug)} />
    <Button icon={Edit} style="text" to={`/articles/${slug}/edit`} />
  </div>
);

const renderText = author => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {author.name}
  </Typography>
);
const renderCategory = category => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {category.name}
  </Typography>
);
const renderDate = (updated_at, status) => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {status === 1 ? formatDateToMonthDayYear(updated_at) : "------"}
  </Typography>
);

export const buildTableColumnData = destroyArticle => [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    render: renderTitle,
  },
  {
    title: "DATE",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (updated_at, { status }) => renderDate(updated_at, status),
  },
  {
    title: "AUTHOR",
    dataIndex: "author",
    key: "author",
    render: renderText,
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    render: renderCategory,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: renderStatus,
  },
  {
    title: "",
    dataIndex: "more",
    key: "more",
    width: "0.5%",
    render: (_, { slug }) => renderDeleteEditButton(slug, destroyArticle),
  },
];
