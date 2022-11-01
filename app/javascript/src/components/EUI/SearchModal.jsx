import React from "react";

import { Search } from "neetoicons";
import { Modal, Select, Typography } from "neetoui";

const SearchModal = ({ publishedArticles, showSearch, setShowSearch }) => (
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
      name="ValueList"
      options={publishedArticles.map(article => ({
        label: article.title,
        value: article.id,
      }))}
      placeholder={
        <Typography className="flex">
          <Search />
          Search for an article.
        </Typography>
      }
    />
  </Modal>
);

export default SearchModal;
