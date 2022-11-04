import React, { useState } from "react";

import { Edit, Delete } from "neetoicons";
import { Typography, Button } from "neetoui";

import DeleteAlert from "./DeleteAlert";
import Form from "./Form";

const Row = ({ redirectionItem, refetch, redirectionsList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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

  return (
    <>
      {showDeleteAlert && (
        <DeleteAlert
          redirectionItemId={redirectionItem.id}
          refetch={refetch}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
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
          <Button
            icon={Delete}
            style="text"
            onClick={() => setShowDeleteAlert(true)}
          />
          <Button
            className="mx-px"
            icon={Edit}
            style="text"
            onClick={() => setIsEdit(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Row;
