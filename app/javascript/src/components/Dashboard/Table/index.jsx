import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { columns, ROW_DATA } from "./utils";

const Table = () => <NeetoUITable columnData={columns} rowData={ROW_DATA} />;

export default Table;
