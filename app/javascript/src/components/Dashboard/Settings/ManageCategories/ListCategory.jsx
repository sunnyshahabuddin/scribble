import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

const ListCategory = ({ category, index }) => (
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
        <Typography className="mt-2" style="h4">
          {category.name}
        </Typography>
        <div className="mt-2">
          <Button icon={Delete} style="text" />
          <Button icon={Edit} style="text" />
        </div>
      </div>
    )}
  </Draggable>
);

export default ListCategory;
