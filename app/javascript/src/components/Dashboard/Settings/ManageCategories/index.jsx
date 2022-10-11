import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import Form from "./Form";
import ListCategory from "./ListCategory";

const ManageCategories = () => {
  const [addCategory, setAddCategory] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [sortedCategoryList, setSortedCategoryList] = useState([]);
  const fetchCategoriesDetails = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setPageLoading(false);
      setSortedCategoryList(categories);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  const reorder = (categoryList, startIndex, endIndex) => {
    const shuffledCategoryList = Array.from(categoryList);
    const [removed] = shuffledCategoryList.splice(startIndex, 1);
    shuffledCategoryList.splice(endIndex, 0, removed);

    return shuffledCategoryList;
  };

  const onDragEnd = finalPosition => {
    if (finalPosition.destination) {
      const reorderedItems = reorder(
        sortedCategoryList,
        finalPosition.source.index,
        finalPosition.destination.index
      );
      setSortedCategoryList(reorderedItems);
    }
  };

  return (
    <div className="mx-auto mt-6 w-1/3">
      <Typography style="h2">Manage Categories</Typography>
      <Typography className="neeto-ui-text-gray-600" style="body2">
        Create and configure the categories inside your scribble.
      </Typography>
      {!addCategory && (
        <Button
          className="mt-2"
          icon={Plus}
          iconPosition="left"
          label="Add new category"
          style="link"
          onClick={() => setAddCategory(true)}
        />
      )}
      {addCategory && <Form />}
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sortedCategoryList.map((category, idx) => (
                  <ListCategory category={category} index={idx} key={idx} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ManageCategories;
