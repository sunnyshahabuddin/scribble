import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography, Button } from "neetoui";
import { Header } from "neetoui/layouts";
import { evolve } from "ramda";

import TooltipWrapper from "components/Common/TooltipWrapper";
import { ARTICLE_CREATE_PATH } from "components/routeConstants";

const { Menu, MenuItem } = Dropdown;

const ActionBlock = ({
  checkedColumn,
  handleCheckedColumn,
  categoryList,
  searchArticleTitle,
  setArticleFilters,
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
            {checkedColumn.map(column => (
              <MenuItem.Button
                key={column.id}
                prefix={
                  <Checkbox
                    checked={column.checked}
                    onChange={() => handleCheckedColumn(column.id)}
                  />
                }
              >
                {column.title}
              </MenuItem.Button>
            ))}
          </Menu>
        </Dropdown>
        <TooltipWrapper
          content="Add category to create an article"
          disabled={categoryList.length === 0}
          followCursor="horizontal"
          position="bottom"
        >
          <Button
            className="mx-2"
            disabled={categoryList.length === 0}
            label="Add New Article"
            to={categoryList.length > 0 ? ARTICLE_CREATE_PATH : "/"}
          />
        </TooltipWrapper>
      </div>
    }
    searchProps={{
      placeholder: "Search article title",
      value: searchArticleTitle,
      onChange: event =>
        setArticleFilters(
          evolve({ searchTitle: () => event.target.value, pageNumber: () => 1 })
        ),
    }}
  />
);

export default ActionBlock;
