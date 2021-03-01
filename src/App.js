import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter as Router, HashRouter, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AuthenticateHomePage from "./views/AuthenticateHomePage";
import { OauthCallBackPage } from "./views/OauthCallBackPage";
import { WireframesPage } from "./views/WireframesPage";
import ProjectPage from "./views/ProjectPage";
import { FeedbackContext, FeedbackContextProvider } from "./contexts/feedback-context";
import NotFoundPage from "./views/NotFoundPage";
import { userAPI } from "./api";

function App() {
  // when the user enters the root App page, initialise user credential and global states
  const [state, dispatch] = useContext(FeedbackContext);
  /**
   * Create an user credential when the user first enters the homepage
   */
  const createAnonymousUser = async () => {
    // create an anonymous user
    console.log('Generating new user credential');
    const userName = 'Anonymous User';
    const userID = uuidv4();
    // send a request to the server
    await userAPI('POST', undefined, { userId: userID, userName })
      .then((res) => {
        if (res.data.success) {
          console.log('Setting up local Storage');
          // update localStorage
          localStorage.setItem('user', JSON.stringify({ userID, userName }));
          setUserCredential(userName, userID);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * This method will update the userName and userID in global context
   */
  const setUserCredential = (userName, userID) => {
    dispatch({
      type: "SET_USER_NAME",
      payload: userName,
    });
    dispatch({
      type: "SET_USER_ID",
      payload: userID,
    })
  };

  useState(() => {
    // check if there is a user credential stored in localStorage
    // if not, create a new user credential
    const storedUserStr = localStorage.getItem('user');
    let userID = "";
    let userName = "";
    if (storedUserStr === null) {
      createAnonymousUser();
    } else {
      // get user credential from localStorage
      const storedUser = JSON.parse(storedUserStr);
      userID = storedUser.userID;
      userName = storedUser.userName;
      setUserCredential(userName, userID);
    }
  }, []);

  // FeedbackContextProvider provides the whole project with shared, centralised states
  return (
    // since the global context will be shared across different pages, the router should be a hash router
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AuthenticateHomePage} />
          <Route exact path="/auth" component={OauthCallBackPage} />
          <Route exact path="/wireframes" component={WireframesPage} />
          <Route exact path="/project/:projectID" component={ProjectPage} />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
