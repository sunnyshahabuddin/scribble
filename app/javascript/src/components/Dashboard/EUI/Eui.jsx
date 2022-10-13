import React from "react";

import Header from "./Header";
import SideBar from "./SideBar";

const Eui = () => (
  <>
    <Header />
    <div className="border-r flex h-screen">
      <SideBar />
      <h1>EUI</h1>
    </div>
  </>
);

export default Eui;
