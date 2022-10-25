import React from "react";

import { useLocation } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import MenuBar from "./MenuBar";
import Redirections from "./Redirections";

const Settings = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const currentTab = useQuery().get("tab");

  return (
    <div className="flex">
      <MenuBar activeTab={currentTab} />
      {currentTab === "general" && <General />}
      {currentTab === "redirections" && <Redirections />}
      {currentTab === "managecategories" && <ManageCategories />}
    </div>
  );
};

export default Settings;
