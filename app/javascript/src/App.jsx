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
import redirectionsApi from "apis/redirections";
import websitesApi from "apis/websites";
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
  const [websiteDetails, setWebsiteDetails] = useState({});
  const [isPasswordValidated, setIsPasswordValidated] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchRedirectionsDetailsAndCheckPasswordValidation();
  }, []);

  const fetchRedirectionsDetailsAndCheckPasswordValidation = async () => {
    try {
      const {
        data: { websites },
      } = await websitesApi.fetch();
      setIsPasswordValidated(
        (authToken && authToken.token !== null) || websites[0].password === null
      );
      setWebsiteDetails(websites[0]);
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setLoading(false);
      setRedirectionsList(redirections);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
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
        <Route exact path="/public/login">
          <PasswordAuthentication
            setIsPasswordValidated={setIsPasswordValidated}
            websiteDetails={websiteDetails}
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
