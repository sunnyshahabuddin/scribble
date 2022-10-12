import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Dashboard from "components/Dashboard";
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
    <>
      <ToastContainer />
      <Dashboard />
    </>
  );
};

export default App;
