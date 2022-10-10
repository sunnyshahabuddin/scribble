import React from "react";

import { Typography } from "neetoui";
import { useRouteMatch, NavLink } from "react-router-dom";

import { MENUBAR_ITEMS } from "./constants";

const MenuBar = () => {
  const { url } = useRouteMatch();

  return (
    <div className="border flex h-screen w-1/4 flex-col">
      {MENUBAR_ITEMS.map(menuBarItem => (
        <NavLink
          activeClassName="neeto-ui-bg-primary-100 neeto-ui-rounded-sm h-18 px-2 py-3 mx-2 my-3"
          className="h-18 mx-2 my-3 px-2 py-3"
          key={menuBarItem.id}
          to={`${url}${menuBarItem.path}`}
        >
          <div className="mx-4 flex">
            <menuBarItem.icon className="my-1 mx-2" size={28} />
            <div>
              <Typography style="h4">{menuBarItem.heading}</Typography>
              <Typography style="body3">{menuBarItem.body}</Typography>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default MenuBar;
