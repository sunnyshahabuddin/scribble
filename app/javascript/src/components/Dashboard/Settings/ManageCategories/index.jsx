import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import categoriesApi from "apis/admin/categories";

import { FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";
import ListCategory from "./ListCategory";

const ManageCategories = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [sortedCategoryList, setSortedCategoryList] = useState([]);
  const [showPane, setShowPane] = useState(false);

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
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  const reorder = (categoryList, startIndex, endIndex) => {
    const shuffledCategoryList = Array.from(categoryList);
    const [removed] = shuffledCategoryList.splice(startIndex, 1);
    shuffledCategoryList.splice(endIndex, 0, removed);

    return shuffledCategoryList;
  };

  const onDragEnd = async finalPosition => {
    if (finalPosition.destination) {
      const reorderedItems = reorder(
        sortedCategoryList,
        finalPosition.source.index,
        finalPosition.destination.index
      );
      setSortedCategoryList(reorderedItems);
      await categoriesApi.position_update({
        id: finalPosition.draggableId,
        destination: finalPosition.destination.index + 1,
      });
    }
  };

  return (
    <div className="w-1/4">
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <MenuBar
                  showMenu
                  className="flex"
                  title={
                    <div className="flex justify-between">
                      <Typography style="h2">Manage Categories</Typography>
                      <Button icon={Plus} onClick={() => setShowPane(true)} />
                    </div>
                  }
                >
                  {sortedCategoryList.map((category, index) => (
                    <ListCategory
                      category={category}
                      categoryList={sortedCategoryList}
                      index={index}
                      key={category.id}
                      refetch={fetchCategoriesDetails}
                    />
                  ))}
                  {provided.placeholder}
                </MenuBar>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {showPane && (
          <Form
            initialValues={FORM_INITIAL_VALUES}
            isEdit={false}
            refetch={fetchCategoriesDetails}
            setShowPane={setShowPane}
            showPane={showPane}
          />
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
