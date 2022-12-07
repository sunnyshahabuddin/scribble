import React from "react";

import { Select } from "neetoui";
import { Container, Header, Scrollable } from "neetoui/layouts";

import Article from "./Article";

const ManageArticles = ({ articles, categoryList }) => (
  <Container isHeaderFixed>
    <Header
      title="Manage Articles"
      actionBlock={
        <Select
          isSearchable
          label="Category"
          name="category"
          placeholder="Select a Category"
          options={categoryList.map(category => ({
            label: category.name,
            value: category.id,
          }))}
        />
      }
    />
    <Scrollable className="h-full w-full space-y-6 py-6" size="small">
      {articles.map(article => (
        <Article article={article} key={article.id} />
      ))}
    </Scrollable>
  </Container>
);

export default ManageArticles;
