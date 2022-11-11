import React from "react";

import { MenuBar } from "neetoui/layouts";

import { ARTICLES_STATUS } from "./constants";

const StatusFilter = ({ articleFilters, setArticleFilters, totalCount }) => (
  <>
    <MenuBar.Block
      count={totalCount.all}
      label="All"
      active={
        !articleFilters.status && typeof articleFilters.status !== "number"
      }
      onClick={() =>
        setArticleFilters(articleFilters => ({
          ...articleFilters,
          status: "",
        }))
      }
    />
    {ARTICLES_STATUS.map(status => (
      <MenuBar.Block
        count={status.value === 1 ? totalCount.published : totalCount.draft}
        key={status.label}
        label={status.label}
        active={
          articleFilters.status === status.value &&
          typeof articleFilters.status === "number"
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
