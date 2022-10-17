import React, { useState, useEffect } from "react";

import { Button, PageLoader, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { ARTICLE_CREATE_PATH } from "components/routeConstants";

import ActionDropDown from "./ActionDropDown";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";
import { INITIAL_CHECKED_LIST } from "./Table/utils";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [articlesStatus, setArticlesStatus] = useState({});
  const [checkedColumn, setCheckedColumn] = useState(INITIAL_CHECKED_LIST);

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
      setArticlesStatus({ draftArticles, publishedArticles });
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
        articlesStatus={articlesStatus}
        categoryList={categoryList}
        refetch={fetchArticlesCategories}
        setArticles={setArticles}
      />
      <Container>
        <Header
          actionBlock={
            <div className="flex">
              <ActionDropDown
                checkedColumn={checkedColumn}
                handleCheckedColumn={handleCheckedColumn}
              />
              <Button
                className="mx-2"
                icon="ri-add-line"
                label="Add New Article"
                to={ARTICLE_CREATE_PATH}
              />
            </div>
          }
          searchProps={{
            placeholder: "Search article title",
          }}
        />
        <Typography className="mb-5" style="h3">
          {articles.length} {articles.length > 1 ? " Articles" : " Article"}
        </Typography>
        <Table articles={articles} destroyArticle={destroyArticle} />
      </Container>
    </div>
  );
};
export default LandingPage;
