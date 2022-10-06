import React, { useState, useEffect } from "react";

import { Button, PageLoader, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import { ARTICLE_CREATE_PATH } from "components/routeConstants";

import ActionDropDown from "./ActionDropDown";
import SideMenuBar from "./SideMenuBar";
import Table from "./Table";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categoryList, setCategoryList] = useState({});
  const [articlesCount, setArticlesCount] = useState({});
  useEffect(() => {
    fetchArticlesCategories();
  }, []);

  const fetchArticlesCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { articles, draft, published },
      } = await articlesApi.fetch();
      const categories = await categoriesApi.fetch();
      setArticlesCount({ all: draft + published, draft, published });
      setCategoryList(categories.data);
      setArticles(articles);
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
        articlesCount={articlesCount}
        categoryList={categoryList}
        refetch={fetchArticlesCategories}
      />
      <Container>
        <Header
          actionBlock={
            <div className="flex">
              <ActionDropDown />
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
          {articles.length} Articles
        </Typography>
        <Table articles={articles} destroyArticle={destroyArticle} />
      </Container>
    </div>
  );
};
export default LandingPage;
