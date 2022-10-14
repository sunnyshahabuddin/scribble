import React, { useState, useEffect } from "react";

import { Accordion, PageLoader, Typography } from "neetoui";
import { NavLink } from "react-router-dom";

import categoriesApi from "apis/categories";

const SideBar = () => {
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});

  useEffect(() => {
    fetchArticlesCategories();
  }, []);
  const fetchArticlesCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setCategoryList(categories);
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
    <Accordion className="border-r h-full w-1/4 px-5">
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
                  to={`/public/${article.slug}`}
                >
                  <Typography style="h4">{article.title}</Typography>
                </NavLink>
              )
          )}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default SideBar;
