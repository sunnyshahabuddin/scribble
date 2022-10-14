import React from "react";

import Header from "./Header";
import ShowArticle from "./ShowArticle";
import SideBar from "./SideBar";

const Eui = () => (
  <>
    <Header />
    <div className="flex h-screen">
      <SideBar />
      <ShowArticle />
    </div>
  </>
);

export default Eui;
