import React, { useState } from "react";

import { Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

import redirectionsApi from "apis/redirections";

import Form from "../Form";

const Row = ({ redirectionItem, refetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  if (isEdit) {
    return (
      <tr>
        <td>
          <Form
            isEdit={isEdit}
            redirectionItem={redirectionItem}
            refetch={refetch}
            setIsEdit={setIsEdit}
            initialValues={{
              id: redirectionItem.id,
              to: redirectionItem.to,
              from: redirectionItem.from,
            }}
          />
        </td>
      </tr>
    );
  }
  const handleDelete = async () => {
    const deleteMessage = confirm(
      "Are you sure you want to delete this article?"
    );
    if (deleteMessage) {
      try {
        await redirectionsApi.destroy(redirectionItem.id);
        refetch();
      } catch (error) {
        logger.error(error);
      }
    }
  };

  return (
    <tr className="mt-2 flex items-center justify-between bg-white p-4">
      <td className="w-2/5 overflow-x-auto">
        <Typography>
          {window.location.origin}
          {redirectionItem.from}
        </Typography>
      </td>
      <td className="w-2/5 overflow-x-auto">
        <Typography>
          {window.location.origin}
          {redirectionItem.to}
        </Typography>
      </td>
      <td className="flex">
        <Button icon={Delete} style="text" onClick={() => handleDelete()} />
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
