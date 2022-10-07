import React, { useState, useMemo } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { searchCategoryList } from "components/Dashboard/LandingPage/utils";

import Form from "./Form";

import { buildCategoryWiseArticle } from "../utils";

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
  const [activeArticleStatus, setActiveArticleStatus] = useState("All");
  const selectedAllArticles = useMemo(() => articles, []);
  const [searchCategory, setSearchCategory] = useState("");
  const [activeCategoryStatus, setActiveCategoryStatus] = useState("");

  return (
    <MenuBar showMenu className="flex" title="Articles">
      <MenuBar.Block
        active={activeArticleStatus === "All"}
        label="All"
        count={
          articlesStatus.draftArticles.length +
          articlesStatus.publishedArticles.length
        }
        onClick={() => {
          setArticles(selectedAllArticles), setActiveArticleStatus("All");
          setActiveCategoryStatus("");
        }}
      />
      <MenuBar.Block
        active={activeArticleStatus === "Draft"}
        count={articlesStatus.draftArticles.length}
        label="Draft"
        onClick={() => {
          setArticles(articlesStatus.draftArticles),
            setActiveArticleStatus("Draft");
          setActiveCategoryStatus("");
        }}
      />
      <MenuBar.Block
        active={activeArticleStatus === "Published"}
        count={articlesStatus.publishedArticles.length}
        label="Published"
        onClick={() => {
          setArticles(articlesStatus.publishedArticles),
            setActiveCategoryStatus("");
          setActiveArticleStatus("Published");
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
    </MenuBar>
  );
};

export default SideMenuBar;
