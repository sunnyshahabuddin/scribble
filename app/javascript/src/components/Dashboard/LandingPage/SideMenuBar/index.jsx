import React, { useState } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import Form from "./Form";

const SideMenuBar = ({ categoryList, refetch, articlesCount }) => {
  const [isCategorySearchCollapsed, setIsCategorySearchCollapsed] =
    useState(true);
  const [isCategoryAddCollapsed, setIsCategoryAddCollapsed] = useState(true);

  return (
    <MenuBar showMenu className="flex" title="Articles">
      <MenuBar.Block active count={articlesCount.all} label="All" />
      <MenuBar.Block count={articlesCount.draft} label="Drafts" />
      <MenuBar.Block count={articlesCount.published} label="Published" />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setIsCategoryAddCollapsed(true),
                setIsCategorySearchCollapsed(
                  isCategorySearchCollapsed => !isCategorySearchCollapsed
                );
            },
          },
          {
            icon: Plus,
            onClick: () => {
              setIsCategorySearchCollapsed(true),
                setIsCategoryAddCollapsed(
                  isCategoryAddCollapsed => !isCategoryAddCollapsed
                );
            },
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isCategorySearchCollapsed}
        onCollapse={() => setIsCategorySearchCollapsed(true)}
      />
      {!isCategoryAddCollapsed && (
        <Form
          refetch={refetch}
          setIsCategoryAddCollapsed={setIsCategoryAddCollapsed}
        />
      )}
      {categoryList.map(category => (
        <MenuBar.Block
          count={category.count}
          key={category.id}
          label={category.name}
        />
      ))}
    </MenuBar>
  );
};

export default SideMenuBar;
