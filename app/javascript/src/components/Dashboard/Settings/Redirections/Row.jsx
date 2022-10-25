import React, { useState } from "react";

import { Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

import redirectionsApi from "apis/redirections";

import Form from "./Form";

const Row = ({ redirectionItem, refetch, redirectionsList }) => {
  const [isEdit, setIsEdit] = useState(false);
  if (isEdit) {
    return (
      <Form
        isEdit={isEdit}
        redirectionItem={redirectionItem}
        redirectionsList={redirectionsList}
        refetch={refetch}
        setIsEdit={setIsEdit}
        initialValues={{
          id: redirectionItem.id,
          to: redirectionItem.to,
          from: redirectionItem.from,
        }}
      />
    );
  }
  const handleDelete = async () => {
    const deleteMessage = confirm(
      "Are you sure you want to delete this redirection?"
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
    <div className="mt-2 flex items-center justify-between bg-white p-4">
      <Typography className="w-2/5 overflow-x-auto">
        {window.location.origin}
        {redirectionItem.from}
      </Typography>
      <Typography className="w-2/5 overflow-x-auto">
        {window.location.origin}
        {redirectionItem.to}
      </Typography>
      <div className="flex">
        <Button icon={Delete} style="text" onClick={() => handleDelete()} />
        <Button
          className="mx-px"
          icon={Edit}
          style="text"
          onClick={() => setIsEdit(true)}
        />
      </div>
    </div>
  );
};

export default Row;
