import React from "react";

import { MenuBar } from "neetoui/layouts";

import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";

const SideMenuBar = ({
  refetch,
  articles,
  categoryList,
  setArticleFilters,
  articleFilters,
}) => (
  <div className="flex">
    <MenuBar showMenu title="Articles">
      <StatusFilter
        articleFilters={articleFilters}
        articles={articles}
        setArticleFilters={setArticleFilters}
      />
      <CategoryFilter
        articleFilters={articleFilters}
        categoryList={categoryList}
        refetch={refetch}
        setArticleFilters={setArticleFilters}
      />
    </MenuBar>
  </div>
);

export default SideMenuBar;
