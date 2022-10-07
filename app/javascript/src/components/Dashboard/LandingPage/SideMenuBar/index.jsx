import React, { useState, useMemo } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { searchCategoryList } from "components/Dashboard/LandingPage/utils";

import Form from "./Form";

const SideMenuBar = ({
  articles,
  categoryList,
  refetch,
  setArticles,
  articlesStatus,
}) => {
  const [isCategorySearchCollapsed, setIsCategorySearchCollapsed] =
    useState(true);
  const [isCategoryAddCollapsed, setIsCategoryAddCollapsed] = useState(true);
  const [activeStatus, setActiveStatus] = useState("All");
  const selectedAllArticles = useMemo(() => articles, []);
  const [searchCategory, setSearchCategory] = useState("");

  return (
    <MenuBar showMenu className="flex" title="Articles">
      <MenuBar.Block
        active={activeStatus === "All"}
        label="All"
        count={
          articlesStatus.draftArticles.length +
          articlesStatus.publishedArticles.length
        }
        onClick={() => {
          setArticles(selectedAllArticles), setActiveStatus("All");
        }}
      />
      <MenuBar.Block
        active={activeStatus === "Draft"}
        count={articlesStatus.draftArticles.length}
        label="Draft"
        onClick={() => {
          setArticles(articlesStatus.draftArticles), setActiveStatus("Draft");
        }}
      />
      <MenuBar.Block
        active={activeStatus === "Published"}
        count={articlesStatus.publishedArticles.length}
        label="Published"
        onClick={() => {
          setArticles(articlesStatus.publishedArticles),
            setActiveStatus("Published");
        }}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setIsCategoryAddCollapsed(true),
                setIsCategorySearchCollapsed(
                  isCategorySearchCollapsed => !isCategorySearchCollapsed
                );
            },
          },
          {
            icon: Plus,
            onClick: () => {
              setIsCategorySearchCollapsed(true),
                setIsCategoryAddCollapsed(
                  isCategoryAddCollapsed => !isCategoryAddCollapsed
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
        collapse={isCategorySearchCollapsed}
        value={searchCategory}
        onChange={e => setSearchCategory(e.target.value)}
        onCollapse={() => setIsCategorySearchCollapsed(true)}
      />
      {!isCategoryAddCollapsed && (
        <Form
          refetch={refetch}
          setIsCategoryAddCollapsed={setIsCategoryAddCollapsed}
        />
      )}
      {searchCategoryList(categoryList, searchCategory).map(category => (
        <MenuBar.Block
          count={category.count}
          key={category.id}
          label={category.name}
        />
      ))}
    </MenuBar>
  );
};

export default SideMenuBar;
