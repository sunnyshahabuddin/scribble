import React from "react";

import { Callout, Typography } from "neetoui";

const InstructionsCallout = ({ setShowInstructions }) => {
  const handleShowInstructions = () => {
    setShowInstructions(false);
    localStorage.setItem("showInstructions", JSON.stringify(false));
  };

  return (
    <Callout>
      <Typography className="neeto-ui-text-gray-600" style="body3">
        You can reorder categories or articles by drag and drop them here. You
        can also multi select articles and move them together to any category
        you have created.&nbsp;
        <span
          className="cursor-pointer underline"
          onClick={() => handleShowInstructions()}
        >
          Don't show this info again
        </span>
      </Typography>
    </Callout>
  );
};

export default InstructionsCallout;
