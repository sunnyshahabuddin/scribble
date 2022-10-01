import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

import { formatDateToMonthDayYear } from "components/Dashboard/utils";

const renderTitle = title => (
  <Typography className="text-indigo-500" style="h5">
    {title}
  </Typography>
);

const renderDeleteEditButton = () => (
  <div className="flex">
    <Button icon={Delete} style="text" />
    <Button icon={Edit} style="text" />
  </div>
);

const renderText = value => (
  //TODO: remove hardocoded data after creating user model and category model
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {value}Author
  </Typography>
);
const renderDate = created_at => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {formatDateToMonthDayYear(created_at)}
  </Typography>
);

export const buildTableColumnData = [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    render: renderTitle,
  },
  {
    title: "DATE",
    dataIndex: "created_at",
    key: "created_at",
    render: renderDate,
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
    render: renderText,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: renderText,
  },
  {
    title: "",
    dataIndex: "more",
    key: "more",
    width: "0.5%",
    render: renderDeleteEditButton,
  },
];
