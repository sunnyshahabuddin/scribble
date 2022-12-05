import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { append, without, evolve, assoc } from "ramda";

import utilityFunctions from "components/Dashboard/LandingPage/utils";
import { useKey } from "hooks/forms/useKey";

import Form from "./Form";

const CategoryFilter = ({
  refetch,
  categoryList,
  articleFilters,
  setArticleFilters,
}) => {
  const [searchCategory, setSearchCategory] = useState("");
  const [collapsableAction, setCollapsableAction] = useState({
    isSearchCollapsed: true,
    isAddCollapsed: true,
  });

  useKey("Escape", () => {
    setSearchCategory("");
    setCollapsableAction(
      evolve({ isSearchCollapsed: () => true, isAddCollapsed: () => true })
    );
  });

  const handleCategoryFilter = categoryId => {
    const updatedCategoryIds = articleFilters.categoryIds?.includes(categoryId)
      ? without([categoryId], articleFilters.categoryIds)
      : append(categoryId, articleFilters.categoryIds);
    setArticleFilters(
      evolve({
        categoryIds: () => updatedCategoryIds,
        pageNumber: () => 1,
      })
    );
  };

  return (
    <>
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setSearchCategory("");
              setCollapsableAction(
                evolve({
                  isSearchCollapsed: isSearchCollapsed => !isSearchCollapsed,
                  isAddCollapsed: () => true,
                })
              );
            },
          },
          {
            icon: Plus,
            onClick: () => {
              setSearchCategory("");
              setCollapsableAction(
                evolve({
                  isAddCollapsed: isAddCollapsed => !isAddCollapsed,
                  isSearchCollapsed: () => true,
                })
              );
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
        collapse={collapsableAction.isSearchCollapsed}
        value={searchCategory}
        onChange={e => setSearchCategory(e.target.value)}
        onCollapse={() => {
          setSearchCategory("");
          setCollapsableAction(assoc("isSearchCollapsed", true));
        }}
      />
      {!collapsableAction.isAddCollapsed && (
        <Form refetch={refetch} setCollapsableAction={setCollapsableAction} />
      )}
      {utilityFunctions
        .searchCategoryList(categoryList, searchCategory)
        .map((category, index) => (
          <MenuBar.Block
            active={articleFilters.categoryIds?.includes(category.id)}
            key={category.name}
            label={category.name}
            count={
              categoryList.filter(category => category.id === category.id)[
                index
              ].articles.length
            }
            onClick={() => handleCategoryFilter(category.id)}
          />
        ))}
    </>
  );
};

export default CategoryFilter;
