import React, { useState, useEffect } from "react";

import { Table as NeetoUITable, PageLoader, Pagination } from "neetoui";
import { assoc, pipe } from "ramda";

import articlesApi from "apis/admin/articles";
import { keysToCamelCase } from "components/Dashboard/utils";

import {
  buildTableColumnData,
  ArticleVisitsColumnData,
  buildRowData,
} from "./utils";

const Analytics = () => {
  const [currentTablePageNumber, setCurrentTablePageNumber] = useState(1);
  const [publishedArticles, setPublishedArticles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticlesAndCount();
  }, [currentTablePageNumber]);

  const fetchArticlesAndCount = async () => {
    setLoading(true);
    try {
      const {
        data: { articles: publishedArticles },
      } = await articlesApi.listPublishedArticles({
        pageNumber: currentTablePageNumber,
      });
      const { data } = await articlesApi.totalCount();
      setPublishedArticles(
        pipe(
          assoc("count", data.published),
          assoc("articles", keysToCamelCase(publishedArticles))
        )
      );
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
        rowData={publishedArticles.articles}
        expandable={{
          expandedRowRender: record => (
            <div className="m-0 w-64 pl-8">
              <NeetoUITable
                allowRowClick={false}
                columnData={ArticleVisitsColumnData}
                rowData={buildRowData(record.dateWiseVisits)}
              />
            </div>
          ),
        }}
      />
      <div className="flex w-full justify-end">
        <Pagination
          className="mt-4"
          count={publishedArticles.count}
          navigate={pageNumber => setCurrentTablePageNumber(pageNumber)}
          pageNo={currentTablePageNumber}
          pageSize={10}
        />
      </div>
    </div>
  );
};

export default Analytics;
