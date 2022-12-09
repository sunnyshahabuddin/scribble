import React, { useState, useEffect } from "react";

import { Select, Alert } from "neetoui";
import { Container, Header, Scrollable } from "neetoui/layouts";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import articlesApi from "apis/admin/articles";
import TooltipWrapper from "components/Common/TooltipWrapper";

import Article from "./Article";
import InstructionsCallout from "./InstructionsCallout";

const ManageArticles = ({ articles, setArticles, categoryList, refetch }) => {
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

  const handleSubmit = async () => {
    try {
      await articlesApi.moveArticles({
        article_ids: selectedArticlesIds,
        category_id: moveToCategory.value,
      });
      setSelectedArticlesIds([]);
      setShowAlert(false);
    } catch (error) {
      logger.error(error);
    }
    refetch();
    setShowAlert(false);
  };

  const reorder = (articles, startIndex, endIndex) => {
    const shuffledArticles = Array.from(articles);
    const [removed] = shuffledArticles.splice(startIndex, 1);
    shuffledArticles.splice(endIndex, 0, removed);

    return shuffledArticles;
  };

  const onDragEnd = async finalPosition => {
    if (finalPosition.destination) {
      const reorderedItems = reorder(
        articles,
        finalPosition.source.index,
        finalPosition.destination.index
      );
      setArticles(reorderedItems);
      try {
        await articlesApi.positionUpdate({
          id: finalPosition.draggableId,
          destination: finalPosition.destination.index + 1,
        });
      } catch (error) {
        logger.error(error);
      }
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
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ManageArticles;
