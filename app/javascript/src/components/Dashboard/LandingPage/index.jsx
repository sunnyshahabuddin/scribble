import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ActionBlock from "./ActionBlock";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";
import { INITIAL_CHECKED_LIST } from "./Table/utils";
import { searchArticleList } from "./utils";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [filteredArticles, setFilteredArticles] = useState({});
  const [checkedColumn, setCheckedColumn] = useState(INITIAL_CHECKED_LIST);
  const [searchArticleTitle, setSearchArticleTitle] = useState("");
  const [isCategoryAddCollapsed, setIsCategoryAddCollapsed] = useState(true);

  useEffect(() => {
    fetchArticlesCategories();
  }, []);

  const fetchArticlesCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { articles, draftArticles, publishedArticles },
      } = await articlesApi.fetch();
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
      setArticles(articles);
      setFilteredArticles({ draftArticles, publishedArticles });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const destroyArticle = async slug => {
    const deleteMessage = confirm(
      "Are you sure you want to delete this article?"
    );
    if (deleteMessage) {
      try {
        await articlesApi.destroy(slug);
        fetchArticlesCategories();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const handleCheckedColumn = checkedIndex => {
    const checkedList = INITIAL_CHECKED_LIST;
    const checkedItem = checkedList[checkedIndex];
    checkedItem.checked = !checkedItem.checked;
    setCheckedColumn([...checkedList]);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <SideMenuBar
        articles={articles}
        categoryList={categoryList}
        filteredArticles={filteredArticles}
        isCategoryAddCollapsed={isCategoryAddCollapsed}
        refetch={fetchArticlesCategories}
        setArticles={setArticles}
        setIsCategoryAddCollapsed={setIsCategoryAddCollapsed}
      />
      <Container>
        <ActionBlock
          categoryList={categoryList}
          checkedColumn={checkedColumn}
          handleCheckedColumn={handleCheckedColumn}
          searchArticleTitle={searchArticleTitle}
          setIsCategoryAddCollapsed={setIsCategoryAddCollapsed}
          setSearchArticleTitle={setSearchArticleTitle}
        />
        <Table
          articles={searchArticleList(articles, searchArticleTitle)}
          destroyArticle={destroyArticle}
        />
      </Container>
    </div>
  );
};
export default LandingPage;
