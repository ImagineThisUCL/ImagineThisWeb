import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, BrowserRouter as Router, HashRouter } from "react-router-dom";
import AuthenticateHomePage from "./views/AuthenticateHomePage";
import { OauthCallBackPage } from "./views/OauthCallBackPage";
import { WireframesPage } from "./views/WireframesPage";
import ProjectPage from "./views/ProjectPage";
import { FeedbackContextProvider } from "./contexts/feedback-context";
import NotFoundPage from "./views/NotFoundPage";

function App() {
  // FeedbackContextProvider provides the whole project with shared, centralised states
  return (
    <FeedbackContextProvider>
      {/* since the global context will be shared across different pages, the router should be a hash router */}
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
    </FeedbackContextProvider>
  );
}

export default App;
