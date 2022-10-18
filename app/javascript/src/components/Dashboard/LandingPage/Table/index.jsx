import React, { useState } from "react";

import { Table as NeetoUITable, Typography } from "neetoui";

import { buildTableColumnData } from "./utils";

const Table = ({ articles = [], destroyArticle }) => {
  const [currentTablePageNumber, setCurrentTablePageNumber] = useState(1);

  return (
    <>
      <Typography className="mb-5" style="h3">
        {articles.length} {articles.length > 1 ? " Articles" : " Article"}
      </Typography>
      <NeetoUITable
        columnData={buildTableColumnData(destroyArticle)}
        currentPageNumber={currentTablePageNumber}
        defaultPageSize={10}
        handlePageChange={e => setCurrentTablePageNumber(e)}
        rowData={articles}
      />
    </>
  );
};

export default Table;
