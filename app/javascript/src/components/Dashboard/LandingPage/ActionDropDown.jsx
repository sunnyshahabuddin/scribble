import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";

const { Menu, MenuItem } = Dropdown;
const listColumns = ["Title", "Category", "Date", "Author", "Status"];

const ActionDropDown = () => (
  <Dropdown
    buttonStyle="secondary"
    className="p-1"
    closeOnSelect={false}
    icon={Down}
    label="Columns"
  >
    <Typography style="h5">Columns</Typography>
    <Menu>
      {listColumns.map((column, idx) => (
        <MenuItem.Button
          key={idx}
          prefix={<Checkbox id="checkbox_name" onChange={() => {}} />}
        >
          {column}
        </MenuItem.Button>
      ))}
    </Menu>
  </Dropdown>
);

export default ActionDropDown;
