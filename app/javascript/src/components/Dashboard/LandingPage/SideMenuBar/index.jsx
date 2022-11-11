import React from "react";

import { MenuBar } from "neetoui/layouts";

import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";

const SideMenuBar = ({
  refetch,
  categoryList,
  setArticleFilters,
  articleFilters,
  totalCount,
}) => (
  <div className="flex">
    <MenuBar showMenu title="Articles">
      <StatusFilter
        articleFilters={articleFilters}
        setArticleFilters={setArticleFilters}
        totalCount={totalCount}
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
