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
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
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
      categories.forEach((category, index) =>
        category.publishedArticles.filter(article => {
          const pathName = window.location.pathname.split("/");
          const slugMatched =
            article.slug ===
            window.location.pathname.split("/")[pathName.length - 1];
          if (slugMatched) setActiveArticle(index);
        })
      );
      findDefaultPath(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findDefaultPath = categories => {
    const defaultCategory = categories.find(
      category => category.publishedArticles.length !== 0
    );

    setDefaultPath(defaultCategory.publishedArticles[0].slug);
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
        defaultActiveKey={activeArticle}
      >
        {categoryList.map((category, idx) => (
          <Accordion.Item key={idx} title={category.name}>
            {category.publishedArticles.map((article, index) => (
              <NavLink
                exact
                activeClassName="neeto-ui-text-primary-500 mx-6"
                className="neeto-ui-text-gray-500 mx-6"
                key={index}
                to={`${url}/${article.slug}`}
              >
                <Typography style="h4">{article.title}</Typography>
              </NavLink>
            ))}
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
    </div>
  );
};

export default SideBar;
