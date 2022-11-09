import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import utilityFunctions from "components/Dashboard/LandingPage/utils";
import { useKey } from "hooks/forms/useKey";

import Form from "./Form";

const CategoryFilter = ({
  refetch,
  categoryList,
  articleFilters,
  setArticleFilters,
}) => {
  const [isCategorySearchCollapsed, setIsCategorySearchCollapsed] =
    useState(true);
  const [searchCategory, setSearchCategory] = useState("");
  const [isCategoryAddCollapsed, setIsCategoryAddCollapsed] = useState(true);

  useKey("Escape", () => {
    setSearchCategory("");
    setIsCategorySearchCollapsed(true);
    setIsCategoryAddCollapsed(true);
  });

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
      {utilityFunctions
        .searchCategoryList(categoryList, searchCategory)
        .map((category, index) => (
          <MenuBar.Block
            active={articleFilters.category_id?.includes(category.id)}
            key={category.name}
            label={category.name}
            count={
              categoryList.filter(category => category.id === category.id)[
                index
              ].articles.length
            }
            onClick={() =>
              setArticleFilters(articleFilters => {
                if (articleFilters.category_id?.includes(category.id)) {
                  return {
                    ...articleFilters,
                    status: "",
                    category_id: articleFilters.category_id.filter(
                      id => id !== category.id
                    ),
                  };
                }

                return {
                  ...articleFilters,
                  status: "",
                  category_id: [...articleFilters.category_id, category.id],
                };
              })
            }
          />
        ))}
    </>
  );
};

export default CategoryFilter;
