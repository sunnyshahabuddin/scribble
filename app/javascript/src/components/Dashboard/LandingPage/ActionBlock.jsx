import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography, Button } from "neetoui";
import { Header } from "neetoui/layouts";

import { ARTICLE_CREATE_PATH } from "components/routeConstants";

const { Menu, MenuItem } = Dropdown;

const ActionBlock = ({
  checkedColumn,
  handleCheckedColumn,
  categoryList,
  searchArticleTitle,
  setSearchArticleTitle,
  setIsCategoryAddCollapsed,
}) => (
  <Header
    actionBlock={
      <div className="flex">
        <Dropdown
          buttonStyle="secondary"
          className="p-1"
          closeOnSelect={false}
          icon={Down}
          label="Columns"
        >
          <Typography style="h5">Columns</Typography>
          <Menu>
            {checkedColumn.map((column, idx) => (
              <MenuItem.Button
                key={idx}
                prefix={
                  <Checkbox
                    checked={column.checked}
                    id="checkbox_name"
                    onChange={() => handleCheckedColumn(idx)}
                  />
                }
              >
                {column.title}
              </MenuItem.Button>
            ))}
          </Menu>
        </Dropdown>
        {categoryList.length > 0 ? (
          <Button
            className="mx-2"
            label="Add New Article"
            to={ARTICLE_CREATE_PATH}
          />
        ) : (
          <Button
            className="mx-2"
            label="Add Category"
            style="secondary"
            tooltipProps={{
              content: "Add Category to create an article",
              position: "top",
            }}
            onClick={() => setIsCategoryAddCollapsed(false)}
          />
        )}
      </div>
    }
    searchProps={{
      placeholder: "Search article title",
      value: searchArticleTitle,
      onChange: e => setSearchArticleTitle(e.target.value),
    }}
  />
);

export default ActionBlock;
