import React from "react";

import { Accordion, Typography } from "neetoui";
import {
  NavLink,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import EmptyState from "./EmptyState";
import ShowArticle from "./ShowArticle";

const SideBar = ({
  activeArticleIndex,
  categoryList,
  defaultPath,
  publishedArticles,
}) => {
  const { url, path } = useRouteMatch();

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
        {categoryList.map(category => (
          <Accordion.Item key={category.id} title={category.name}>
            {category.publishedArticles.length === 0 ? (
              <Typography className="neeto-ui-text-pastel-red" style="h4">
                No Articles
              </Typography>
            ) : (
              category.publishedArticles.map(article => (
                <NavLink
                  exact
                  activeClassName="neeto-ui-text-primary-500 mx-6"
                  className="neeto-ui-text-gray-500 mx-6"
                  key={article.slug}
                  to={`${url}/${article.slug}`}
                >
                  <Typography style="h4">{article.title}</Typography>
                </NavLink>
              ))
            )}
          </Accordion.Item>
        ))}
      </Accordion>
      <Switch>
        {publishedArticles.map(article => (
          <Route key={article.id} path={`${path}/${article.slug}`}>
            <ShowArticle slug={article.slug} />
          </Route>
        ))}
        <Redirect exact from="/public" to={`/public/${defaultPath}`} />
      </Switch>
      {activeArticleIndex === -1 && (
        <EmptyState message="Article does not exists " />
      )}
    </div>
  );
};

export default SideBar;
