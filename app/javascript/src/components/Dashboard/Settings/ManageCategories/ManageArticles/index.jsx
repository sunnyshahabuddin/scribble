import React, { useState, useEffect } from "react";

import { Select, Alert } from "neetoui";
import { Container, Header, Scrollable } from "neetoui/layouts";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TooltipWrapper from "components/Common/TooltipWrapper";

import Article from "./Article";
import InstructionsCallout from "./InstructionsCallout";

const ManageArticles = ({ articles, setArticles, categoryList }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedArticlesIds, setSelectedArticlesIds] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [moveToCategory, setMoveToCategory] = useState({});

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

  const handleMoveToCategory = category => {
    setShowAlert(true);
    setMoveToCategory(category);
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
    <>
      <Container isHeaderFixed className="fixed">
        <Header
          title="Manage Articles"
          actionBlock={
            <TooltipWrapper
              content="Select at least an article first to move them into a category"
              disabled={selectedArticlesIds.length === 0}
              followCursor="horizontal"
              position="bottom"
            >
              <Select
                isSearchable
                className="w-48"
                isDisabled={selectedArticlesIds.length === 0}
                name="category"
                placeholder="Move to category"
                options={categoryList.map(category => ({
                  label: category.name,
                  value: category.id,
                }))}
                onChange={category => handleMoveToCategory(category)}
              />
            </TooltipWrapper>
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
                    <Article
                      article={article}
                      index={index}
                      key={article.id}
                      selectedArticlesIds={selectedArticlesIds}
                      setSelectedArticlesIds={setSelectedArticlesIds}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Scrollable>
      </Container>
      {showAlert && (
        <Alert
          isOpen={showAlert}
          message={`Are you sure you want to move these ${selectedArticlesIds.length} selected articles to ${moveToCategory.label}?`}
          title="Move Articles"
          onClose={() => setShowAlert(false)}
          onSubmit={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

export default ManageArticles;
