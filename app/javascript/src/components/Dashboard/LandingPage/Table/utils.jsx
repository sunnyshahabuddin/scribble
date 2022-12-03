import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Link } from "react-router-dom";

import { formatDateToMonthDayYear } from "components/Dashboard/utils";

const renderStatus = status => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {status === 0 ? "Draft" : "Published"}
  </Typography>
);

const renderTitle = (title, id) => (
  <Link to={`/articles/${id}/edit`}>
    <Typography className="text-indigo-500" style="h5">
      {title}
    </Typography>
  </Link>
);
const renderDeleteEditButton = (id, title, destroyArticle) => (
  <div className="flex">
    <Button
      icon={Delete}
      style="text"
      onClick={() => destroyArticle({ id, title })}
    />
    <Button icon={Edit} style="text" to={`/articles/${id}/edit`} />
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
const renderDate = (updatedAt, status) => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {status === 1 ? formatDateToMonthDayYear(updatedAt) : "------"}
  </Typography>
);

export const INITIAL_CHECKED_LIST = [
  { id: 0, title: "Title", checked: true },
  { id: 1, title: "Date", checked: true },
  { id: 2, title: "Author", checked: true },
  { id: 3, title: "Category", checked: true },
  { id: 4, title: "Status", checked: true },
];

export const buildTableColumnData = destroyArticle =>
  [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      checked: INITIAL_CHECKED_LIST[0].checked,
      render: (title, { id }) => renderTitle(title, id),
    },
    {
      title: "LAST UPDATED AT",
      dataIndex: "updatedAt",
      key: "updatedAt",
      checked: INITIAL_CHECKED_LIST[1].checked,
      render: (updatedAt, { status }) => renderDate(updatedAt, status),
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
      checked: INITIAL_CHECKED_LIST[2].checked,
      render: renderText,
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      checked: INITIAL_CHECKED_LIST[3].checked,
      render: renderCategory,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      checked: INITIAL_CHECKED_LIST[4].checked,
      render: renderStatus,
    },
    {
      title: "",
      dataIndex: "more",
      key: "more",
      width: "0.5%",
      checked: true,
      render: (_, { id, title }) =>
        renderDeleteEditButton(id, title, destroyArticle),
    },
  ].filter(column => column.checked);
