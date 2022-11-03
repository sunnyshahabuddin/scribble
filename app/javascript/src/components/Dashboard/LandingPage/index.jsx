import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ActionBlock from "./ActionBlock";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";
import { INITIAL_CHECKED_LIST } from "./Table/utils";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [checkedColumn, setCheckedColumn] = useState(INITIAL_CHECKED_LIST);
  const [searchArticleTitle, setSearchArticleTitle] = useState("");
  const [articleFilters, setArticleFilters] = useState({
    status: 2,
    category_id: [],
  });

  useEffect(() => {
    fetchArticlesCategories();
  }, [articleFilters, searchArticleTitle]);

  const fetchArticlesCategories = async () => {
    const payload = {
      search_filter: searchArticleTitle,
      status_filter: articleFilters.status,
      category_filter: articleFilters.category_id,
    };
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch(payload);
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
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
        article={articles}
        articleFilters={articleFilters}
        categoryList={categoryList}
        refetch={fetchArticlesCategories}
        setArticleFilters={setArticleFilters}
        setArticles={setArticles}
      />
      <Container>
        <ActionBlock
          categoryList={categoryList}
          checkedColumn={checkedColumn}
          handleCheckedColumn={handleCheckedColumn}
          searchArticleTitle={searchArticleTitle}
          setSearchArticleTitle={setSearchArticleTitle}
        />
        <Table articles={articles} refetch={fetchArticlesCategories} />
      </Container>
    </div>
  );
};
export default LandingPage;
