import React from "react";

import { Search } from "neetoicons";
import { Modal, Select, Typography } from "neetoui";
import { useRouteMatch, useHistory } from "react-router-dom";

import Instructions from "./Instructions";
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
      <Instructions />
      <Select
        defaultMenuIsOpen
        isClearable
        isSearchable
        className="mx-2 mb-4"
        options={publishedArticles.map(article => ({
          label: article.title,
          value: article.slug,
        }))}
        placeholder={
          <div className="flex justify-between">
            <Typography className="flex">
              <Search />
              Search for an article.
            </Typography>
          </div>
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
