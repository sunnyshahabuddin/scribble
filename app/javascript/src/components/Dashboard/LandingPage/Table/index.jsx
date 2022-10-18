import React, { useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildTableColumnData } from "./utils";

const Table = ({ articles = [], destroyArticle }) => {
  const [currentTablePageNumber, setCurrentTablePageNumber] = useState(1);

  return (
    <NeetoUITable
      columnData={buildTableColumnData(destroyArticle)}
      currentPageNumber={currentTablePageNumber}
      defaultPageSize={10}
      handlePageChange={e => setCurrentTablePageNumber(e)}
      rowData={articles}
    />
  );
};

export default Table;
