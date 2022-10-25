import React from "react";

import { Typography } from "neetoui";
import { useRouteMatch, Link } from "react-router-dom";

import { MENUBAR_ITEMS } from "./constants";

const MenuBar = ({ activeTab }) => {
  const { url } = useRouteMatch();

  return (
    <div className="border-r flex h-screen w-1/4 flex-col">
      {MENUBAR_ITEMS.map(menuBarItem => (
        <Link
          key={menuBarItem.id}
          to={`${url}?tab=${menuBarItem.tab}`}
          className={
            activeTab === menuBarItem.tab
              ? "neeto-ui-bg-primary-100 neeto-ui-rounded-sm h-18 mx-2 my-3 px-2 py-3"
              : "h-18 mx-2 my-3 px-2 py-3"
          }
        >
          <div className="mx-4 flex">
            <menuBarItem.icon className="my-1 mx-2" size={28} />
            <div>
              <Typography style="h4">{menuBarItem.heading}</Typography>
              <Typography style="body3">{menuBarItem.body}</Typography>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuBar;
