import React from "react";

import { Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

const renderTitle = title => (
  <Typography className="text-indigo-500" style="h5">
    {title}
  </Typography>
);

const renderButtonDelete = () => <Button icon={Delete} style="text" />;

const renderButtonEdit = () => <Button icon={Edit} style="text" />;

const renderText = value => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {value}
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
    dataIndex: "date",
    key: "date",
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
    render: renderButtonDelete,
  },
  {
    title: "",
    dataIndex: "more",
    key: "more",
    width: "0.5%",
    render: renderButtonEdit,
  },
];

export const ROW_DATA = [
  {
    title: "When Title is very big",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "category",
    status: "status",
    id: 1,
  },
  {
    title: "Title",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "category",
    status: "status",
    id: 2,
  },
  {
    title: "Title",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "category",
    status: "status",
    id: 3,
  },
  {
    title: "Title",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "category",
    status: "status",
    id: 4,
  },
  {
    title: "Title",
    date: "October 9th, 2022",
    author: "Oliver Smith",
    category: "category",
    status: "status",
    id: 5,
  },
];
