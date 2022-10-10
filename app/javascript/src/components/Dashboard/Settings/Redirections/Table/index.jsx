import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import Row from "./Row";

import { TABLE_HEADER, REDIRECTION_ITEMS } from "../constants";
import Form from "../Form";

const Table = () => {
  const [addRedirection, setAddRedirection] = useState(false);

  return (
    <table className="mx-auto w-full">
      <thead>
        <tr className="flex items-center justify-between">
          {TABLE_HEADER.map((title, idx) => (
            <th key={idx}>
              <Typography style="h5">{title}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {REDIRECTION_ITEMS.map((item, idx) => (
          <Row key={idx} redirectionItem={item} />
        ))}
        <tr>
          <td>{addRedirection && <Form />}</td>
        </tr>
        <tr>
          <td>
            <Button
              className="mt-2"
              icon={Plus}
              iconPosition="left"
              label="Add new redirections"
              style="link"
              onClick={() => setAddRedirection(true)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
