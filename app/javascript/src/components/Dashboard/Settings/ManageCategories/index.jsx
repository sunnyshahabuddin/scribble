import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { isEmpty } from "ramda";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import categoriesApi from "apis/admin/categories";
import { keysToCamelCase } from "components/Dashboard/utils";
import EmptyState from "images/EmptyState";

import { FORM_INITIAL_VALUES } from "./constants";
import Form from "./Form";
import ListCategory from "./ListCategory";
import ManageArticles from "./ManageArticles";

const ManageCategories = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const [sortedCategoryList, setSortedCategoryList] = useState([]);
  const [showPane, setShowPane] = useState(false);
  const [activeCategory, setActiveCategory] = useState({});
  const [articles, setArticles] = useState([]);

  const fetchCategoriesAndArticles = async () => {
    await Promise.all([fetchCategories(), fetchArticlesInActiveCategory()]);
    setPageLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();
      setPageLoading(false);
      setSortedCategoryList(keysToCamelCase(categories));
      isEmpty(activeCategory) &&
        setActiveCategory(keysToCamelCase(categories)[0]);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };
  const fetchArticlesInActiveCategory = async () => {
    if (!isEmpty(activeCategory)) {
      try {
        const {
          data: { articles },
        } = await categoriesApi.show(activeCategory.id);
        setArticles(keysToCamelCase(articles));
      } catch (error) {
        logger.error(error);
      }
    }
  };

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
      await categoriesApi.positionUpdate({
        id: finalPosition.draggableId,
        destination: finalPosition.destination.index + 1,
      });
    }
  };

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, [activeCategory]);

  if (pageLoading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-3/4">
      <div className="w-1/3">
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
                      activeCategory={activeCategory}
                      category={category}
                      categoryList={sortedCategoryList}
                      index={index}
                      key={category.id}
                      refetch={fetchCategoriesAndArticles}
                      setActiveCategory={setActiveCategory}
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
            refetch={fetchCategoriesAndArticles}
            setShowPane={setShowPane}
            showPane={showPane}
          />
        )}
      </div>
      <div className="w-2/3">
        {articles?.length > 0 ? (
          <ManageArticles
            articles={articles}
            categoryList={sortedCategoryList}
            setArticles={setArticles}
          />
        ) : (
          <img className="m-auto w-2/3" src={EmptyState} />
        )}
      </div>
    </div>
  );
};

export default ManageCategories;
