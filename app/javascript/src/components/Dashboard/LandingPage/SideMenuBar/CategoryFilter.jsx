import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { searchCategoryList } from "components/Dashboard/LandingPage/utils";

import Form from "./Form";

import { buildCategoryWiseArticle } from "../utils";

const CategoryFilter = ({
  setIsCategoryAddCollapsed,
  isCategoryAddCollapsed,
  refetch,
  categoryList,
  activeCategoryStatus,
  setActiveArticleStatus,
  setActiveCategoryStatus,
  setArticles,
}) => {
  const [isCategorySearchCollapsed, setIsCategorySearchCollapsed] =
    useState(true);
  const [searchCategory, setSearchCategory] = useState("");

  return (
    <>
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setIsCategoryAddCollapsed(true),
                setIsCategorySearchCollapsed(
                  isCategorySearchCollapsed => !isCategorySearchCollapsed
                );
              setSearchCategory("");
            },
          },
          {
            icon: Plus,
            onClick: () => {
              setIsCategorySearchCollapsed(true),
                setIsCategoryAddCollapsed(
                  isCategoryAddCollapsed => !isCategoryAddCollapsed
                );
              setSearchCategory("");
            },
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isCategorySearchCollapsed}
        value={searchCategory}
        onChange={e => setSearchCategory(e.target.value)}
        onCollapse={() => {
          setIsCategorySearchCollapsed(true);
          setSearchCategory("");
        }}
      />
      {!isCategoryAddCollapsed && (
        <Form
          refetch={refetch}
          setIsCategoryAddCollapsed={setIsCategoryAddCollapsed}
        />
      )}
      {searchCategoryList(categoryList, searchCategory).map(category => (
        <MenuBar.Block
          active={activeCategoryStatus === category.name}
          count={category.articles.length}
          key={category.id}
          label={category.name}
          onClick={() => {
            const categoryArticles = buildCategoryWiseArticle(category);
            setActiveArticleStatus("");
            setActiveCategoryStatus(category.name);
            setArticles(categoryArticles);
          }}
        />
      ))}
    </>
  );
};

export default CategoryFilter;
