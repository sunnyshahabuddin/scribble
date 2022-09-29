import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData, ROW_DATA } from "./utils";

const Table = () => (
  <NeetoUITable columnData={buildTableColumnData} rowData={ROW_DATA} />
);

export default Table;
