import React, { useState, useMemo } from "react";

import { MenuBar } from "neetoui/layouts";

import ArticleFilter from "./ArticleFilter";
import CategoryFilter from "./CategoryFilter";

const SideMenuBar = ({
  articles,
  categoryList,
  refetch,
  setArticles,
  filteredArticles,
  isCategoryAddCollapsed,
  setIsCategoryAddCollapsed,
}) => {
  const [activeArticleStatus, setActiveArticleStatus] = useState("All");
  const selectedAllArticles = useMemo(() => articles, []);
  const [activeCategoryStatus, setActiveCategoryStatus] = useState("");

  return (
    <MenuBar showMenu className="flex" title="Articles">
      <ArticleFilter
        activeArticleStatus={activeArticleStatus}
        filteredArticles={filteredArticles}
        selectedAllArticles={selectedAllArticles}
        setActiveArticleStatus={setActiveArticleStatus}
        setActiveCategoryStatus={setActiveCategoryStatus}
        setArticles={setArticles}
      />
      <CategoryFilter
        activeCategoryStatus={activeCategoryStatus}
        categoryList={categoryList}
        isCategoryAddCollapsed={isCategoryAddCollapsed}
        refetch={refetch}
        setActiveArticleStatus={setActiveArticleStatus}
        setActiveCategoryStatus={setActiveCategoryStatus}
        setArticles={setArticles}
        setIsCategoryAddCollapsed={setIsCategoryAddCollapsed}
      />
    </MenuBar>
  );
};

export default SideMenuBar;
