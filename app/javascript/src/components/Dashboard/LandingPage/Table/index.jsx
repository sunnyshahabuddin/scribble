import React, { useState } from "react";

import { Table as NeetoUITable, Typography } from "neetoui";

import { buildTableColumnData } from "./utils";

import DeleteAlert from "../DeleteAlert";

const Table = ({ articles = [], refetch }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});

  const destroyArticle = article => {
    setShowDeleteAlert(true);
    setSelectedArticle(article);
  };

  return (
    <>
      <Typography className="mb-5" style="h3">
        {articles.length} {articles.length > 1 ? " Articles" : " Article"}
      </Typography>
      <NeetoUITable
        allowRowClick={false}
        columnData={buildTableColumnData(destroyArticle)}
        rowData={articles}
      />
      {showDeleteAlert && (
        <DeleteAlert
          refetch={refetch}
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </>
  );
};

export default Table;
