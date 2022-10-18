import React from "react";

const EmptyState = ({ message }) => (
  <div className="container mx-auto my-8 flex flex-col items-center">
    <div className="max-w-md text-center">
      <h2 className="text-9xl mb-8 font-extrabold dark:text-gray-600">
        {message}
      </h2>
    </div>
  </div>
);

export default EmptyState;
