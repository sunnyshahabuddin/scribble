import React, { useState, useEffect } from "react";

import { Table as NeetoUITable, PageLoader } from "neetoui";

import articlesApi from "apis/admin/articles";

import { buildTableColumnData } from "./utils";

const Analytics = () => {
  const [currentTablePageNumber, setCurrentTablePageNumber] = useState(1);
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles: publishedArticles },
      } = await articlesApi.listPublishedArticles();
      setPublishedArticles(publishedArticles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto my-8 w-auto px-64">
      <NeetoUITable
        allowRowClick={false}
        columnData={buildTableColumnData}
        currentPageNumber={currentTablePageNumber}
        defaultPageSize={10}
        handlePageChange={e => setCurrentTablePageNumber(e)}
        rowData={publishedArticles}
      />
    </div>
  );
};

export default Analytics;
