import React from "react";

import { Typography, Kbd } from "neetoui";

const Instructions = () => (
  <div className="neeto-ui-rounded-md m-2 flex h-10 justify-between bg-gray-100 pt-2">
    <div className="flex">
      <Kbd className="mr-1 h-4" keyName="↑" />
      <Kbd className=" h-4" keyName="↓" />
      <Typography className="mt-px" style="body2">
        to navigate
      </Typography>
    </div>
    <div className="flex">
      <Kbd keyName="Return" />
      <Typography className="mt-px" style="body2">
        to select
      </Typography>
    </div>
    <div className="mr-1 flex">
      <Kbd keyName="Esc" />
      <Typography className="mt-px" style="body2">
        to close
      </Typography>
    </div>
  </div>
);

export default Instructions;
