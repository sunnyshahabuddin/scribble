import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./utils";

const Table = ({ articles = [] }) => (
  <NeetoUITable columnData={buildTableColumnData} rowData={articles} />
);

export default Table;
