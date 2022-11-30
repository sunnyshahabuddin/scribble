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
const renderDate = (updated_at, status) => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {status === 1 ? formatDateToMonthDayYear(updated_at) : "------"}
  </Typography>
);

export const INITIAL_CHECKED_LIST = [
  { title: "Title", checked: true },
  { title: "Date", checked: true },
  { title: "Author", checked: true },
  { title: "Category", checked: true },
  { title: "Status", checked: true },
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
      dataIndex: "updated_at",
      key: "updated_at",
      checked: INITIAL_CHECKED_LIST[1].checked,
      render: (updated_at, { status }) => renderDate(updated_at, status),
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
