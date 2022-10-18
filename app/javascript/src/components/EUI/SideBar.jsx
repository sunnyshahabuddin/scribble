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

import EmptyState from "./EmptyState";
import ShowArticle from "./ShowArticle";
import { findActiveArticleIndex, findDefaultPath } from "./utils";

const SideBar = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [defaultPath, setDefaultPath] = useState("");
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
        data: { publishedArticles },
      } = await articlesApi.fetch();
      setCategoryList(categories);
      setPublishedArticles(publishedArticles);
      findActiveArticleIndex(categories, setActiveArticleIndex);
      findDefaultPath(categories, setDefaultPath);
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

  if (categoryList.length === 0) {
    return (
      <EmptyState message="No preview available, add category to proceed " />
    );
  }

  return (
    <div className="flex">
      <Accordion
        className="border-r h-screen w-1/4 px-5"
        defaultActiveKey={activeArticleIndex}
      >
        {categoryList.map((category, idx) => (
          <Accordion.Item key={idx} title={category.name}>
            {category.publishedArticles.length === 0 ? (
              <Typography className="neeto-ui-text-pastel-red" style="h4">
                No Articles
              </Typography>
            ) : (
              category.publishedArticles.map((article, index) => (
                <NavLink
                  exact
                  activeClassName="neeto-ui-text-primary-500 mx-6"
                  className="neeto-ui-text-gray-500 mx-6"
                  key={index}
                  to={`${url}/${article.slug}`}
                  onClick={() => setActiveArticleIndex(index)}
                >
                  <Typography style="h4">{article.title}</Typography>
                </NavLink>
              ))
            )}
          </Accordion.Item>
        ))}
      </Accordion>
      <Switch>
        {publishedArticles.map((article, index) => (
          <Route key={index} path={`${path}/${article.slug}`}>
            <ShowArticle
              articleTitle={article.title}
              body={article.body}
              categoryTitle={article.category.name}
              publishedDate={article.updated_at}
            />
          </Route>
        ))}
        <Redirect exact from="/public" to={`public/${defaultPath}`} />
      </Switch>
      {activeArticleIndex === -1 && (
        <EmptyState message="Article does not exists " />
      )}
    </div>
  );
};

export default SideBar;
