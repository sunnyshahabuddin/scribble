import React from "react";

import { Search } from "neetoicons";
import { Modal, Select, Typography } from "neetoui";
import { useRouteMatch, useHistory } from "react-router-dom";

import { findActiveArticleIndex } from "./utils";

const SearchModal = ({
  publishedArticles,
  showSearch,
  setShowSearch,
  categoryList,
  setActiveArticleIndex,
}) => {
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <Modal
      closeButton={false}
      isOpen={showSearch}
      size="medium"
      onClose={() => setShowSearch(false)}
    >
      <Select
        defaultMenuIsOpen
        isClearable
        isSearchable
        options={publishedArticles.map(article => ({
          label: article.title,
          value: article.slug,
        }))}
        placeholder={
          <Typography className="flex">
            <Search />
            Search for an article.
          </Typography>
        }
        onChange={article => {
          history.push(`${url}/${article.value}`);
          findActiveArticleIndex(categoryList, setActiveArticleIndex);
          setShowSearch(false);
        }}
      />
    </Modal>
  );
};

export default SearchModal;
