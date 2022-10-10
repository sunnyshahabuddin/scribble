import React, { useState } from "react";

import { Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

import Form from "../Form";

const Row = ({ redirectionItem }) => {
  const [isEdit, setIsEdit] = useState(false);
  if (isEdit) {
    return (
      <tr>
        <td>
          <Form setIsEdit={setIsEdit} />
        </td>
      </tr>
    );
  }

  return (
    <tr className="mt-2 flex items-center justify-between bg-white p-4">
      <td className="w-2/5 overflow-x-auto">
        <Typography>{redirectionItem.to}</Typography>
      </td>
      <td className="w-2/5 overflow-x-auto">
        <Typography>{redirectionItem.from}</Typography>
      </td>
      <td className="flex">
        <Button icon={Delete} style="text" />
        <Button
          className="mx-px"
          icon={Edit}
          style="text"
          onClick={() => setIsEdit(true)}
        />
      </td>
    </tr>
  );
};

export default Row;
