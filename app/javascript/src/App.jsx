import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import organizationApi from "apis/admin/organization";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import Eui from "components/EUI";
import "lib/dayjs"; // eslint-disable-line
import PasswordAuthentication from "./components/EUI/PasswordAuthentication";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchOrganizationAndValidatePassword();
  }, []);

  const fetchOrganizationAndValidatePassword = async () => {
    try {
      const { data: organizationDetails } = await organizationApi.show();
      setOrganizationDetails({
        name: organizationDetails.name,
        isPasswordProtected: organizationDetails.is_password_protected,
      });
      setIsPasswordValidated(
        !either(isNil, isEmpty)(authToken) ||
          !organizationDetails.is_password_protected
      );
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {isPasswordValidated && <Redirect from="/public/login" to="/public" />}
        <Route exact path="/public/login">
          <PasswordAuthentication organizationDetails={organizationDetails} />
        </Route>
        <PrivateRoute
          component={() => <Eui />}
          condition={isPasswordValidated}
          path="/public"
          redirectRoute="/public/login"
        />
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
