import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography, Button } from "neetoui";
import { Header } from "neetoui/layouts";

import { ARTICLE_CREATE_PATH } from "components/routeConstants";

import TooltipWrapper from "../../Common/TooltipWrapper";

const { Menu, MenuItem } = Dropdown;

const ActionBlock = ({
  checkedColumn,
  handleCheckedColumn,
  categoryList,
  searchArticleTitle,
  setSearchArticleTitle,
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
        <TooltipWrapper
          content="Add Category to create an article"
          disabled={categoryList.length === 0}
          followCursor="horizontal"
          position="bottom"
        >
          <Button
            className="mx-2"
            disabled={categoryList.length === 0}
            label="Add New Article"
            to={ARTICLE_CREATE_PATH}
          />
        </TooltipWrapper>
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
