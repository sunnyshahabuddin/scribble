import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";

import Eui from "./components/Dashboard/EUI";

import "lib/dayjs"; // eslint-disable-line

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route component={Eui} path="/public" />
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
