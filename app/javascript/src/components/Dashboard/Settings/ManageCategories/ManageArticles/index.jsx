import React, { useState, useEffect } from "react";

import { Select } from "neetoui";
import { Container, Header, Scrollable } from "neetoui/layouts";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Article from "./Article";
import InstructionsCallout from "./InstructionsCallout";

const ManageArticles = ({ articles, setArticles, categoryList }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleShowInstructions = () => {
    const showInstructionsFromLocalStorage = JSON.parse(
      localStorage.getItem("showInstructions")
    );
    if (showInstructionsFromLocalStorage === false) {
      setShowInstructions(false);
    } else {
      setShowInstructions(true);
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
        articles,
        finalPosition.source.index,
        finalPosition.destination.index
      );
      setArticles(reorderedItems);
    }
  };

  useEffect(() => {
    handleShowInstructions();
  }, [showInstructions]);

  return (
    <Container isHeaderFixed className="fixed">
      <Header
        title="Manage Articles"
        actionBlock={
          <Select
            isSearchable
            className="w-48"
            name="category"
            placeholder="Move to"
            options={categoryList.map(category => ({
              label: category.name,
              value: category.id,
            }))}
          />
        }
      />
      <Scrollable className="h-full w-full space-y-6 py-6" size="large">
        {showInstructions && (
          <InstructionsCallout setShowInstructions={setShowInstructions} />
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {articles.map((article, index) => (
                  <Article article={article} index={index} key={article.id} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Scrollable>
    </Container>
  );
};

export default ManageArticles;
