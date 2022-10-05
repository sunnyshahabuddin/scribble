import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./utils";

const Table = ({ articles = [], destroyArticle }) => (
  <NeetoUITable
    columnData={buildTableColumnData(destroyArticle)}
    rowData={articles}
  />
);

export default Table;
