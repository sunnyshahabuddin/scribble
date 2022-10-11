import React, { useState } from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

import Form from "./Form";

const ListCategory = ({ category, index, refetch }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Draggable
      draggableId={category.id.toString()}
      index={index}
      key={category.id}
    >
      {provided => (
        <div
          className="mt-4 flex items-center justify-between border-t-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {!isEdit ? (
            <>
              <Typography className="mt-2" style="h4">
                {category.name}
              </Typography>
              <div className="mt-2">
                <Button icon={Delete} style="text" />
                <Button
                  icon={Edit}
                  style="text"
                  onClick={() => setIsEdit(true)}
                />
              </div>
            </>
          ) : (
            <Form
              isEdit
              id={category.id}
              initialValues={{ name: category.name }}
              refetch={refetch}
              setIsEdit={setIsEdit}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ListCategory;
