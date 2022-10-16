import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import Row from "./Row";

import { TABLE_HEADER } from "../constants";
import Form from "../Form";

const Table = ({ redirectionsList, refetch }) => {
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
        {redirectionsList.map((item, idx) => (
          <Row key={idx} redirectionItem={item} refetch={refetch} />
        ))}
        <tr>
          <td>
            {addRedirection && (
              <Form
                initialValues={{ from: "", to: "" }}
                isEdit={false}
                refetch={refetch}
                setAddRedirection={setAddRedirection}
              />
            )}
          </td>
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
