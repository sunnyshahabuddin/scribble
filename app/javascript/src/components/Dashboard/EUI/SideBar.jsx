import React, { useState, useEffect } from "react";

import { Accordion, PageLoader, Typography } from "neetoui";

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
    <div className="border-r h-screen w-1/4">
      <Accordion className="h-full px-5">
        {categoryList.map((category, idx) => (
          <Accordion.Item key={idx} title={category.name}>
            {category.articles.map(
              (article, index) =>
                article.status === 1 && (
                  <Typography key={index}>{article.title}</Typography>
                )
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default SideBar;
