import React from "react";

import { Typography } from "neetoui";
import { Link } from "react-router-dom";

import { formatDateToMonthDayYear } from "components/Dashboard/utils";

const renderTitle = (title, slug) => (
  <Link target="_blank" to={`/public/${slug}`}>
    <Typography className="text-indigo-500" style="h5">
      {title}
    </Typography>
  </Link>
);

const renderDate = updated_at => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {formatDateToMonthDayYear(updated_at)}
  </Typography>
);

const renderCategory = category => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {category.name}
  </Typography>
);

const renderVisits = visits => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {visits}
  </Typography>
);

export const buildTableColumnData = [
  {
    title: "TITLE",
    dataIndex: "title",
    key: "title",
    width: "40%",
    render: (title, { slug }) => renderTitle(title, slug, status),
  },
  {
    title: "DATE",
    dataIndex: "updated_at",
    key: "updated_at",
    width: "25%",
    render: updated_at => renderDate(updated_at),
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    width: "25%",
    render: category => renderCategory(category),
  },
  {
    title: "VISITS",
    dataIndex: "visits",
    key: "visits",
    sorter: (a, b) => a.visits - b.visits,
    width: "10%",
    render: visits => renderVisits(visits),
  },
];
