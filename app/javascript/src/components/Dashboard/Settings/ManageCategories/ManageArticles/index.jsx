import React, { useState, useEffect } from "react";

import { Select } from "neetoui";
import { Container, Header, Scrollable } from "neetoui/layouts";

import Article from "./Article";
import InstructionsCallout from "./InstructionsCallout";

const ManageArticles = ({ articles, categoryList }) => {
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
        {articles.map(article => (
          <Article article={article} key={article.id} />
        ))}
      </Scrollable>
    </Container>
  );
};

export default ManageArticles;
