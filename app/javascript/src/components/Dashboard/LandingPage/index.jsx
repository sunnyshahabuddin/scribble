import React, { useState, useEffect } from "react";

import { Button, PageLoader, Typography } from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";
import { ARTICLE_CREATE_PATH } from "components/routeConstants";

import ActionDropDown from "./ActionDropDown";
import SideMenuBar from "./MenuBar";
import Table from "./Table";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.fetch();
      setArticles(articles);
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
    <div className="flex items-start">
      <SideMenuBar />
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
        <Table articles={articles} />
      </Container>
    </div>
  );
};
export default LandingPage;
