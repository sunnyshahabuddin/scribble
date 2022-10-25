import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import organizationApi from "apis/organization";
import redirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/Dashboard";
import Eui from "components/EUI";
import "lib/dayjs"; // eslint-disable-line
import PasswordAuthentication from "./components/EUI/PasswordAuthentication";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const [redirectionsList, setRedirectionsList] = useState([]);
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [isPasswordValidated, setIsPasswordValidated] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchRedirectionsDetailsAndCheckPasswordValidation();
  }, []);

  const fetchRedirectionsDetailsAndCheckPasswordValidation = async () => {
    try {
      const response = await organizationApi.show();
      setOrganizationDetails({
        name: response.data.name,
        isPasswordProtected: response.data.is_password_protected,
      });
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setIsPasswordValidated(
        (authToken && authToken.token) || !response.data.is_password_protected
      );
      setLoading(false);
      setRedirectionsList(redirections);
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
        {redirectionsList.map(redirection => (
          <Route exact from={redirection.from} key={redirection.from}>
            <Redirect
              to={{ pathname: redirection.to, state: { status: 301 } }}
            />
          </Route>
        ))}
        {isPasswordValidated && <Redirect from="/public/login" to="/public" />}
        <Route exact path="/public/login">
          <PasswordAuthentication
            organizationDetails={organizationDetails}
            setIsPasswordValidated={setIsPasswordValidated}
          />
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
