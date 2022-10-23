import React from "react";

import { MenuBar } from "neetoui/layouts";

const ArticleFilter = ({
  activeArticleStatus,
  filteredArticles,
  setArticles,
  setActiveArticleStatus,
  setActiveCategoryStatus,
  selectedAllArticles,
}) => (
  <>
    <MenuBar.Block
      active={activeArticleStatus === "All"}
      label="All"
      count={
        filteredArticles.draftArticles.length +
        filteredArticles.publishedArticles.length
      }
      onClick={() => {
        setArticles(selectedAllArticles), setActiveArticleStatus("All");
        setActiveCategoryStatus("");
      }}
    />
    <MenuBar.Block
      active={activeArticleStatus === "Draft"}
      count={filteredArticles.draftArticles.length}
      label="Draft"
      onClick={() => {
        setArticles(filteredArticles.draftArticles),
          setActiveArticleStatus("Draft");
        setActiveCategoryStatus("");
      }}
    />
    <MenuBar.Block
      active={activeArticleStatus === "Published"}
      count={filteredArticles.publishedArticles.length}
      label="Published"
      onClick={() => {
        setArticles(filteredArticles.publishedArticles),
          setActiveCategoryStatus("");
        setActiveArticleStatus("Published");
      }}
    />
  </>
);

export default ArticleFilter;
