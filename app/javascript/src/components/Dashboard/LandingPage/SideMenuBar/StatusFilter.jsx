import React from "react";

import { MenuBar } from "neetoui/layouts";

import { ARTICLES_STATUS } from "./constants";

const StatusFilter = ({ articleFilters, setArticleFilters, article }) => (
  <>
    <MenuBar.Block
      count={article.length}
      label="All"
      active={
        !articleFilters.status && typeof articleFilters.status !== "number"
      }
      onClick={() =>
        setArticleFilters(articleFilters => ({
          ...articleFilters,
          status: null,
        }))
      }
    />
    {ARTICLES_STATUS.map(status => (
      <MenuBar.Block
        key={status.label}
        label={status.label}
        active={
          articleFilters.status === status.value &&
          typeof articleFilters.status === "number"
        }
        count={
          article.filter(article => article.status === status.value).length
        }
        onClick={() => {
          setArticleFilters(articleFilters => ({
            ...articleFilters,
            status: status.value,
          }));
        }}
      />
    ))}
  </>
);

export default StatusFilter;
