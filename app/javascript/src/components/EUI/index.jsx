import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useLocation } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Header from "./Header";
import SideBar from "./SideBar";
import { findActiveArticleIndex, findDefaultPath } from "./utils";

const Eui = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [defaultPath, setDefaultPath] = useState("");

  const location = useLocation();

  useEffect(() => {
    fetchArticlesCategoriesAndSlugMatch();
  }, [location]);

  const fetchArticlesCategoriesAndSlugMatch = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      const {
        data: { articles: publishedArticles },
      } = await articlesApi.listPublishedArticles();
      setCategoryList(categories);
      setPublishedArticles(publishedArticles);
      findDefaultPath(categories, setDefaultPath, setActiveArticleIndex);
      findActiveArticleIndex(categories, setActiveArticleIndex);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
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
    <>
      <Header />
      <SideBar
        activeArticleIndex={activeArticleIndex}
        categoryList={categoryList}
        defaultPath={defaultPath}
        publishedArticles={publishedArticles}
      />
    </>
  );
};

export default Eui;
