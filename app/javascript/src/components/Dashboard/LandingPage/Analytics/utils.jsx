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

const renderDate = updatedAt => (
  <Typography className="neeto-ui-text-gray-600" style="body2">
    {formatDateToMonthDayYear(updatedAt)}
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
    render: (title, { slug }) => renderTitle(title, slug),
  },
  {
    title: "DATE",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: "25%",
    render: updatedAt => renderDate(updatedAt),
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
export const ArticleVisitsColumnData = [
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
    width: "5%",
    render: date => (
      <Typography className="text-gray-700" lineHeight="loose" style="h5">
        {date}
      </Typography>
    ),
  },
  {
    title: "Visits",
    dataIndex: "visits",
    key: "visits",
    width: "5%",
    render: visits => (
      <Typography className="text-gray-700" style="h5">
        {visits}
      </Typography>
    ),
  },
];

export const buildRowData = datesWiseVisits =>
  Object.keys(datesWiseVisits).map((date, index) => ({
    id: index,
    date,
    visits: datesWiseVisits[date],
  }));
