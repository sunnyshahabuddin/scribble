import React, { useState, useEffect } from "react";

import { Accordion, PageLoader, Typography } from "neetoui";
import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ShowArticle from "./ShowArticle";

const SideBar = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(0);
  const { url, path } = useRouteMatch();

  useEffect(() => {
    fetchArticlesCategoriesAndSlugMatch();
  }, []);
  const fetchArticlesCategoriesAndSlugMatch = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setCategoryList(categories);
      setArticles(articles);
      categories.forEach((category, index) =>
        category.articles.filter(article => {
          const slugMatched =
            article.slug === window.location.pathname.split("/")[2];
          if (slugMatched) setSelectedArticle(index);
        })
      );
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
    <div className="flex">
      <Accordion
        className="border-r h-screen w-1/4 px-5"
        defaultActiveKey={selectedArticle}
      >
        {categoryList.map((category, idx) => (
          <Accordion.Item key={idx} title={category.name}>
            {category.articles.map(
              (article, index) =>
                article.status === 1 && (
                  <NavLink
                    exact
                    activeClassName="neeto-ui-text-primary-500 mx-6"
                    className="neeto-ui-text-gray-500 mx-6"
                    key={index}
                    to={`${url}/${article.slug}`}
                  >
                    <Typography style="h4">{article.title}</Typography>
                  </NavLink>
                )
            )}
          </Accordion.Item>
        ))}
      </Accordion>
      <Switch>
        {articles.map((article, index) => (
          <Route key={index} path={`${path}/${article.slug}`}>
            <ShowArticle
              articleTitle={article.title}
              body={article.body}
              categoryTitle={article.category.name}
              publishedDate={article.updated_at}
            />
          </Route>
        ))}
        <Redirect
          from="/public"
          to={`public/${categoryList[0].articles[0].slug}`}
        />
      </Switch>
    </div>
  );
};

export default SideBar;
