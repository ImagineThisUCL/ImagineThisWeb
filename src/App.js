import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter as Router, HashRouter } from "react-router-dom";
import AuthenticateHomePage from "./views/AuthenticateHomePage";
import { OauthCallBackPage } from "./views/OauthCallBackPage";
import { WireframesPage } from "./views/WireframesPage";
import ProjectPage from "./views/ProjectPage";
import { FeedbackContextProvider } from "./contexts/feedback-context";

function App() {
  return (
    <FeedbackContextProvider>
      <HashRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={AuthenticateHomePage} />
            <Route exact path="/auth" component={OauthCallBackPage} />
            <Route exact path="/wireframes" component={WireframesPage} />
            <Route exact path="/project/:projectID" component={ProjectPage} />
          </Switch>
        </div>
      </HashRouter>
    </FeedbackContextProvider>
  );
}

export default App;
