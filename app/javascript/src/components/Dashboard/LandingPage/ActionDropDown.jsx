import React from "react";

import { Down } from "neetoicons";
import { Dropdown, Checkbox, Typography } from "neetoui";

const { Menu, MenuItem } = Dropdown;

const ActionDropDown = ({ checkedColumn, handleCheckedColumn }) => (
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
);

export default ActionDropDown;
