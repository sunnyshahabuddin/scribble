import React from "react";

import { MenuBar } from "neetoui/layouts";

import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";

const SideMenuBar = ({
  refetch,
  article,
  categoryList,
  setArticleFilters,
  articleFilters,
}) => (
  <div className="flex">
    <MenuBar showMenu title="Articles">
      <StatusFilter
        article={article}
        articleFilters={articleFilters}
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
